/**
 * セキュリティヘッダー
 * @see {@link https://nextjs.org/docs/advanced-features/security-headers}
 */
export const securityHeaders = [
  /**
   * iframeを利用する場合は、X-Frame-Optionsを設定する必要がある
   * @see {@link https://nextjs.org/docs/advanced-features/security-headers#x-frame-options}
   */
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  /**
   * Content-Security-Policyを設定する
   * @see {@link https://nextjs.org/docs/advanced-features/security-headers#content-security-policy}
   * @see {@link https://developer.mozilla.org/ja/docs/Web/HTTP/CSP}
   * @see {@link https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy}
   */
  {
    key: "Content-Security-Policy",
    value: `frame-ancestors 'none';`,
  },
  /**
   * スニッフィング対策で、Content-Typeを指定する
   * @see {@link https://nextjs.org/docs/advanced-features/security-headers#x-content-type-options}
   * @see {@link https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-Content-Type-Options}
   */
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  /**
   * XSS対策
   * @see {@link https://nextjs.org/docs/advanced-features/security-headers#x-xss-protection}
   * @see {@link https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-XSS-Protection}
   */
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];
