const backfaceFixed = (fixed: boolean) => {
  /**
   * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
   */
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;
  document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : "";

  /**
   * スクロール位置を取得する要素を出力する(`html`or`body`)
   */
  // const scrollingElement = () => {
  //   const browser = window.navigator.userAgent.toLowerCase();
  //   if ("scrollingElement" in document) {
  //     const scrollTopPosition: number = document.scrollingElement
  //       ? document.scrollingElement.scrollTop
  //       : 0;
  //     return scrollTopPosition;
  //   }
  //   if (browser.indexOf("webkit") > 0) return document.body;
  //   return document.documentElement;
  // };

  /**
   * 変数にスクロール量を格納
   */
  // const scrollY = fixed
  //   ? scrollingElement()
  //   : parseInt(document.body.style.top || "0");

  // /**
  //  * CSSで背面を固定
  //  */
  // type Styles = {
  //   height: string;
  //   left: string;
  //   overflow: string;
  //   position: string;
  //   top: string;
  //   width: string;
  // };

  // const styles: Styles = {
  //   height: "100vh",
  //   left: "0",
  //   overflow: "hidden",
  //   position: "fixed",
  //   top: `${scrollY * -1}px`,
  //   width: "100vw",
  // };

  // Object.keys(styles).forEach((key: string) => {
  //   document.body.style[key] = fixed ? styles[key] : "";
  // });

  // /**
  //  * 背面固定解除時に元の位置にスクロールする
  //  */
  // if (!fixed) window.scrollTo(0, scrollY * -1);
};

export { backfaceFixed };
