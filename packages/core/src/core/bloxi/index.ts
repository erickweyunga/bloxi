import React from "react";
import { createStyleComponent } from "../createStyleComponent";

/**
 * Basic structure components
 */
export const HtmlDiv = createStyleComponent("div", "BxDiv");
export const HtmlSpan = createStyleComponent("span", "BxSpan");
export const HtmlSection = createStyleComponent("section", "BxSection");
export const HtmlArticle = createStyleComponent("article", "BxArticle");
export const HtmlAside = createStyleComponent("aside", "BxAside");
export const HtmlNav = createStyleComponent("nav", "BxNav");
export const HtmlHeader = createStyleComponent("header", "BxHeader");
export const HtmlFooter = createStyleComponent("footer", "BxFooter");
export const HtmlMain = createStyleComponent("main", "BxMain");

/**
 * Typography components
 */
export const HtmlH1 = createStyleComponent("h1", "BxH1");
export const HtmlH2 = createStyleComponent("h2", "BxH2");
export const HtmlH3 = createStyleComponent("h3", "BxH3");
export const HtmlH4 = createStyleComponent("h4", "BxH4");
export const HtmlH5 = createStyleComponent("h5", "BxH5");
export const HtmlH6 = createStyleComponent("h6", "BxH6");
export const HtmlP = createStyleComponent("p", "BxP");
export const HtmlBlockquote = createStyleComponent(
  "blockquote",
  "BxBlockquote"
);
export const HtmlPre = createStyleComponent("pre", "BxPre");
export const HtmlCode = createStyleComponent("code", "BxCode");
export const HtmlEm = createStyleComponent("em", "BxEm");
export const HtmlStrong = createStyleComponent("strong", "BxStrong");
export const HtmlSmall = createStyleComponent("small", "BxSmall");
export const HtmlMark = createStyleComponent("mark", "BxMark");
export const HtmlDel = createStyleComponent("del", "BxDel");
export const HtmlIns = createStyleComponent("ins", "BxIns");
export const HtmlSub = createStyleComponent("sub", "BxSub");
export const HtmlSup = createStyleComponent("sup", "BxSup");

/**
 * Form components
 */
export const HtmlForm = createStyleComponent("form", "BxForm");
export const HtmlInput = createStyleComponent("input", "BxInput");
export const HtmlButton = createStyleComponent("button", "BxButton");
export const HtmlTextarea = createStyleComponent("textarea", "BxTextarea");
export const HtmlSelect = createStyleComponent("select", "BxSelect");
export const HtmlOption = createStyleComponent("option", "BxOption");
export const HtmlOptGroup = createStyleComponent("optgroup", "BxOptGroup");
export const HtmlLabel = createStyleComponent("label", "BxLabel");
export const HtmlFieldset = createStyleComponent("fieldset", "BxFieldset");
export const HtmlLegend = createStyleComponent("legend", "BxLegend");

/**
 * Table components
 */
export const HtmlTable = createStyleComponent("table", "BxTable");
export const HtmlTHead = createStyleComponent("thead", "BxTHead");
export const HtmlTBody = createStyleComponent("tbody", "BxTBody");
export const HtmlTFoot = createStyleComponent("tfoot", "BxTFoot");
export const HtmlTr = createStyleComponent("tr", "BxTr");
export const HtmlTh = createStyleComponent("th", "BxTh");
export const HtmlTd = createStyleComponent("td", "BxTd");
export const HtmlCaption = createStyleComponent("caption", "BxCaption");
export const HtmlCol = createStyleComponent("col", "BxCol");
export const HtmlColGroup = createStyleComponent("colgroup", "BxColGroup");

/**
 * List components
 */
export const HtmlUl = createStyleComponent("ul", "BxUl");
export const HtmlOl = createStyleComponent("ol", "BxOl");
export const HtmlLi = createStyleComponent("li", "BxLi");
export const HtmlDl = createStyleComponent("dl", "BxDl");
export const HtmlDt = createStyleComponent("dt", "BxDt");
export const HtmlDd = createStyleComponent("dd", "BxDd");

/**
 * Media components
 */
export const HtmlImg = createStyleComponent("img", "BxImg");
export const HtmlVideo = createStyleComponent("video", "BxVideo");
export const HtmlAudio = createStyleComponent("audio", "BxAudio");
export const HtmlSource = createStyleComponent("source", "BxSource");
export const HtmlTrack = createStyleComponent("track", "BxTrack");
export const HtmlCanvas = createStyleComponent("canvas", "BxCanvas");
export const HtmlSvg = createStyleComponent("svg", "BxSvg");
export const HtmlFigure = createStyleComponent("figure", "BxFigure");
export const HtmlFigCaption = createStyleComponent(
  "figcaption",
  "BxFigCaption"
);

/**
 * Interactive components
 */
export const HtmlA = createStyleComponent("a", "BxA");
export const HtmlSummary = createStyleComponent("summary", "BxSummary");
export const HtmlDetails = createStyleComponent("details", "BxDetails");
export const HtmlDialog = createStyleComponent("dialog", "BxDialog");

/**
 * Other useful elements
 */
export const HtmlHr = createStyleComponent("hr", "BxHr");
export const HtmlBr = createStyleComponent("br", "BxBr");
export const HtmlWbr = createStyleComponent("wbr", "BxWbr");
export const HtmlTime = createStyleComponent("time", "BxTime");
export const HtmlProgress = createStyleComponent("progress", "BxProgress");
export const HtmlMeter = createStyleComponent("meter", "BxMeter");
export const HtmlIFrame = createStyleComponent("iframe", "BxIFrame");

/**
 * Additional components
 */
export const HtmlB = createStyleComponent("b", "BxB");
export const HtmlI = createStyleComponent("i", "BxI");
export const HtmlU = createStyleComponent("u", "BxU");
export const HtmlQ = createStyleComponent("q", "BxQ");
export const HtmlS = createStyleComponent("s", "BxS");
export const HtmlCite = createStyleComponent("cite", "BxCite");
export const HtmlVar = createStyleComponent("var", "BxVar");
export const HtmlKbd = createStyleComponent("kbd", "BxKbd");

/**
 * New components added
 */

// **Header and footer layout components**
export const HtmlSectionHeader = createStyleComponent(
  "header",
  "BxSectionHeader"
);
export const HtmlSectionFooter = createStyleComponent(
  "footer",
  "BxSectionFooter"
);

// **Flexbox-based layout components**
export const HtmlFlex = createStyleComponent("div", "BxFlex");
export const HtmlFlexRow = createStyleComponent("div", "BxFlexRow");
export const HtmlFlexColumn = createStyleComponent("div", "BxFlexColumn");

// **Grid-based layout components**
export const HtmlGrid = createStyleComponent("div", "BxGrid");
export const HtmlGridItem = createStyleComponent("div", "BxGridItem");

// **Media-related components**
export const HtmlPicture = createStyleComponent("picture", "BxPicture");
export const HtmlIframe = createStyleComponent("iframe", "BxIframe");

// **SVG-related components**
export const HtmlCircle = createStyleComponent("circle", "BxCircle");
export const HtmlRect = createStyleComponent("rect", "BxRect");
export const HtmlLine = createStyleComponent("line", "BxLine");

// **Text decoration components**
export const HtmlUnderline = createStyleComponent("u", "BxUnderline");
export const HtmlStrikethrough = createStyleComponent("s", "BxStrikethrough");

/**
 * The components above provide a simple way to apply styles to common HTML elements. Each component
 * is designed to be customizable with props passed to it. They can be used just like any other React
 * component but come with pre-configured style names for quick styling with a CSS-in-JS solution or
 * using TailwindCSS.
 */
