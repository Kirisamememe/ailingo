"use client";

import React, {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type VirtualListApi = {
  scrollToIndex: (index: number, align?: "auto" | "start" | "center" | "end") => void;
  getContainer: () => HTMLDivElement | null;
};

type Props = {
  /** 総アイテム数 */
  itemCount: number;
  /** 1アイテムの固定高さ(px) */
  itemHeight: number;
  /** 追加で描画する上下の行数 */
  overScan?: number;
  /** ビューポートの高さ。未指定の場合はデフォルトで70vh */
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  /** indexを受け取って項目を描画する */
  children: (index: number) => ReactNode;
  /** 操作用APIを取得（forwardRef非使用・React19向け） */
  getApi?: (api: VirtualListApi | undefined) => void;
};

/**
 * 固定行高の超軽量バーチャルリスト
 * - 行高固定(itemHeight)を前提に、スクロール位置から表示範囲を計算して部分描画
 */
export const VirtualList: React.FC<Props> = ({
  itemCount,
  itemHeight,
  overScan = 6,
  height = "70vh",
  className,
  style,
  children,
  getApi,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);

  // 測定: コンテナの高さ
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const update = () => {
      setViewportHeight(container.clientHeight);
    };
    update();

    const ro = new ResizeObserver(() => {
      update();
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
    };
  }, []);

  // スクロール監視
  const onScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    setScrollTop(container.scrollTop);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const totalHeight = itemCount * itemHeight;

  const { startIndex, endIndex, topSpacerHeight, bottomSpacerHeight } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overScan);
    const visibleCount = viewportHeight > 0 ? Math.ceil(viewportHeight / itemHeight) : 0;
    const end = Math.min(itemCount, start + visibleCount + overScan * 2);
    const topH = start * itemHeight;
    const bottomH = Math.max(0, totalHeight - topH - (end - start) * itemHeight);
    return { startIndex: start, endIndex: end, topSpacerHeight: topH, bottomSpacerHeight: bottomH };
  }, [scrollTop, viewportHeight, itemHeight, overScan, itemCount, totalHeight]);

  // 外部操作: 指定indexへスクロール
  const scrollToIndex = useCallback(
    (index: number, align: "auto" | "start" | "center" | "end" = "auto") => {
      const container = containerRef.current;
      if (!container) return;
      const targetTop = index * itemHeight;
      const targetBottom = targetTop + itemHeight;
      const viewTop = container.scrollTop;
      const viewBottom = viewTop + container.clientHeight;

      let nextScrollTop = viewTop;
      if (align === "start") {
        nextScrollTop = targetTop;
      } else if (align === "end") {
        nextScrollTop = targetBottom - container.clientHeight;
      } else if (align === "center") {
        nextScrollTop = targetTop - (container.clientHeight - itemHeight) / 2;
      } else {
        // auto: ビュー外なら見える位置まで
        if (targetTop < viewTop) nextScrollTop = targetTop;
        else if (targetBottom > viewBottom) nextScrollTop = targetBottom - container.clientHeight;
      }

      container.scrollTo({ top: Math.max(0, nextScrollTop), behavior: "auto" });
    },
    [itemHeight],
  );

  const api = useMemo<VirtualListApi>(() => {
    return {
      scrollToIndex,
      getContainer: () => containerRef.current,
    };
  }, [scrollToIndex]);

  useEffect(() => {
    if (!getApi) return undefined;
    getApi(api);
    return () => {
      getApi(undefined);
    };
  }, [api, getApi]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-y-auto", className)}
      style={{ height, ...style }}
    >
      {/* 上部スペーサー */}
      {topSpacerHeight > 0 && <div style={{ height: topSpacerHeight }} />}

      {/* 可視範囲のみ描画。FragmentなのでDOMは増えない */}
      {Array.from({ length: Math.max(0, endIndex - startIndex) }, (_, i) => startIndex + i).map(
        (index) => (
          <React.Fragment key={index}>{children(index)}</React.Fragment>
        ),
      )}

      {/* 下部スペーサー */}
      {bottomSpacerHeight > 0 && <div style={{ height: bottomSpacerHeight }} />}
    </div>
  );
};

export type { Props as VirtualListProps };
