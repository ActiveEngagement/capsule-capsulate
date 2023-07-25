var ml = Object.defineProperty;
var Tl = (e, t, r) => t in e ? ml(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var li = (e, t, r) => (Tl(e, typeof t != "symbol" ? t + "" : t, r), r);
var q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Er(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Gt(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var u = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, u.get ? u : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var ms = { exports: {} }, Ts = {}, bs = {};
Object.defineProperty(bs, "__esModule", { value: !0 });
var Hn = {}, mr = {}, Nn = q && q.__assign || function() {
  return Nn = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var u in t)
        Object.prototype.hasOwnProperty.call(t, u) && (e[u] = t[u]);
    }
    return e;
  }, Nn.apply(this, arguments);
};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.flatten = void 0;
var bl = {
  xml: !1,
  decodeEntities: !0
};
mr.default = bl;
var fi = {
  _useHtmlParser2: !0,
  xmlMode: !0
};
function pl(e) {
  return e != null && e.xml ? typeof e.xml == "boolean" ? fi : Nn(Nn({}, fi), e.xml) : e ?? void 0;
}
mr.flatten = pl;
var Ie = {}, ce;
(function(e) {
  e.Root = "root", e.Text = "text", e.Directive = "directive", e.Comment = "comment", e.Script = "script", e.Style = "style", e.Tag = "tag", e.CDATA = "cdata", e.Doctype = "doctype";
})(ce || (ce = {}));
function ps(e) {
  return e.type === ce.Tag || e.type === ce.Script || e.type === ce.Style;
}
const gs = ce.Root, _s = ce.Text, As = ce.Directive, Cs = ce.Comment, Ns = ce.Script, Is = ce.Style, Ss = ce.Tag, ys = ce.CDATA, Os = ce.Doctype, gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CDATA: ys,
  Comment: Cs,
  Directive: As,
  Doctype: Os,
  get ElementType() {
    return ce;
  },
  Root: gs,
  Script: Ns,
  Style: Is,
  Tag: Ss,
  Text: _s,
  isTag: ps
}, Symbol.toStringTag, { value: "Module" }));
class ua {
  constructor() {
    this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(t) {
    this.parent = t;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(t) {
    this.prev = t;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(t) {
    this.next = t;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(t = !1) {
    return Ur(this, t);
  }
}
class Yn extends ua {
  /**
   * @param data The content of the data node
   */
  constructor(t) {
    super(), this.data = t;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(t) {
    this.data = t;
  }
}
class ar extends Yn {
  constructor() {
    super(...arguments), this.type = ce.Text;
  }
  get nodeType() {
    return 3;
  }
}
class $n extends Yn {
  constructor() {
    super(...arguments), this.type = ce.Comment;
  }
  get nodeType() {
    return 8;
  }
}
class qn extends Yn {
  constructor(t, r) {
    super(r), this.name = t, this.type = ce.Directive;
  }
  get nodeType() {
    return 1;
  }
}
class jn extends ua {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(t) {
    super(), this.children = t;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var t;
    return (t = this.children[0]) !== null && t !== void 0 ? t : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(t) {
    this.children = t;
  }
}
class aa extends jn {
  constructor() {
    super(...arguments), this.type = ce.CDATA;
  }
  get nodeType() {
    return 4;
  }
}
class xt extends jn {
  constructor() {
    super(...arguments), this.type = ce.Root;
  }
  get nodeType() {
    return 9;
  }
}
class Gn extends jn {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(t, r, n = [], u = t === "script" ? ce.Script : t === "style" ? ce.Style : ce.Tag) {
    super(n), this.name = t, this.attribs = r, this.type = u;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(t) {
    this.name = t;
  }
  get attributes() {
    return Object.keys(this.attribs).map((t) => {
      var r, n;
      return {
        name: t,
        value: this.attribs[t],
        namespace: (r = this["x-attribsNamespace"]) === null || r === void 0 ? void 0 : r[t],
        prefix: (n = this["x-attribsPrefix"]) === null || n === void 0 ? void 0 : n[t]
      };
    });
  }
}
function Z(e) {
  return ps(e);
}
function Gr(e) {
  return e.type === ce.CDATA;
}
function nt(e) {
  return e.type === ce.Text;
}
function Wr(e) {
  return e.type === ce.Comment;
}
function In(e) {
  return e.type === ce.Directive;
}
function Rt(e) {
  return e.type === ce.Root;
}
function Le(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
function Ur(e, t = !1) {
  let r;
  if (nt(e))
    r = new ar(e.data);
  else if (Wr(e))
    r = new $n(e.data);
  else if (Z(e)) {
    const n = t ? Iu(e.children) : [], u = new Gn(e.name, { ...e.attribs }, n);
    n.forEach((i) => i.parent = u), e.namespace != null && (u.namespace = e.namespace), e["x-attribsNamespace"] && (u["x-attribsNamespace"] = { ...e["x-attribsNamespace"] }), e["x-attribsPrefix"] && (u["x-attribsPrefix"] = { ...e["x-attribsPrefix"] }), r = u;
  } else if (Gr(e)) {
    const n = t ? Iu(e.children) : [], u = new aa(n);
    n.forEach((i) => i.parent = u), r = u;
  } else if (Rt(e)) {
    const n = t ? Iu(e.children) : [], u = new xt(n);
    n.forEach((i) => i.parent = u), e["x-mode"] && (u["x-mode"] = e["x-mode"]), r = u;
  } else if (In(e)) {
    const n = new qn(e.name, e.data);
    e["x-name"] != null && (n["x-name"] = e["x-name"], n["x-publicId"] = e["x-publicId"], n["x-systemId"] = e["x-systemId"]), r = n;
  } else
    throw new Error(`Not implemented yet: ${e.type}`);
  return r.startIndex = e.startIndex, r.endIndex = e.endIndex, e.sourceCodeLocation != null && (r.sourceCodeLocation = e.sourceCodeLocation), r;
}
function Iu(e) {
  const t = e.map((r) => Ur(r, !0));
  for (let r = 1; r < t.length; r++)
    t[r].prev = t[r - 1], t[r - 1].next = t[r];
  return t;
}
const di = {
  withStartIndices: !1,
  withEndIndices: !1,
  xmlMode: !1
};
class ir {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(t, r, n) {
    this.dom = [], this.root = new xt(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof r == "function" && (n = r, r = di), typeof t == "object" && (r = t, t = void 0), this.callback = t ?? null, this.options = r ?? di, this.elementCB = n ?? null;
  }
  onparserinit(t) {
    this.parser = t;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [], this.root = new xt(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
  }
  onerror(t) {
    this.handleCallback(t);
  }
  onclosetag() {
    this.lastNode = null;
    const t = this.tagStack.pop();
    this.options.withEndIndices && (t.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(t);
  }
  onopentag(t, r) {
    const n = this.options.xmlMode ? ce.Tag : void 0, u = new Gn(t, r, void 0, n);
    this.addNode(u), this.tagStack.push(u);
  }
  ontext(t) {
    const { lastNode: r } = this;
    if (r && r.type === ce.Text)
      r.data += t, this.options.withEndIndices && (r.endIndex = this.parser.endIndex);
    else {
      const n = new ar(t);
      this.addNode(n), this.lastNode = n;
    }
  }
  oncomment(t) {
    if (this.lastNode && this.lastNode.type === ce.Comment) {
      this.lastNode.data += t;
      return;
    }
    const r = new $n(t);
    this.addNode(r), this.lastNode = r;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const t = new ar(""), r = new aa([t]);
    this.addNode(r), t.parent = r, this.lastNode = t;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(t, r) {
    const n = new qn(t, r);
    this.addNode(n);
  }
  handleCallback(t) {
    if (typeof this.callback == "function")
      this.callback(t, this.dom);
    else if (t)
      throw t;
  }
  addNode(t) {
    const r = this.tagStack[this.tagStack.length - 1], n = r.children[r.children.length - 1];
    this.options.withStartIndices && (t.startIndex = this.parser.startIndex), this.options.withEndIndices && (t.endIndex = this.parser.endIndex), r.children.push(t), n && (t.prev = n, n.next = t), t.parent = r, this.lastNode = null;
  }
}
const _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CDATA: aa,
  Comment: $n,
  DataNode: Yn,
  Document: xt,
  DomHandler: ir,
  Element: Gn,
  Node: ua,
  NodeWithChildren: jn,
  ProcessingInstruction: qn,
  Text: ar,
  cloneNode: Ur,
  default: ir,
  hasChildren: Le,
  isCDATA: Gr,
  isComment: Wr,
  isDirective: In,
  isDocument: Rt,
  isTag: Z,
  isText: nt
}, Symbol.toStringTag, { value: "Module" })), gt = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), vs = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))
);
var Su;
const Al = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), Hu = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (Su = String.fromCodePoint) !== null && Su !== void 0 ? Su : function(e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  }
);
function xs(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = Al.get(e)) !== null && t !== void 0 ? t : e;
}
var we;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(we || (we = {}));
const Cl = 32;
var ze;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(ze || (ze = {}));
function Yu(e) {
  return e >= we.ZERO && e <= we.NINE;
}
function Nl(e) {
  return e >= we.UPPER_A && e <= we.UPPER_F || e >= we.LOWER_A && e <= we.LOWER_F;
}
function Il(e) {
  return e >= we.UPPER_A && e <= we.UPPER_Z || e >= we.LOWER_A && e <= we.LOWER_Z || Yu(e);
}
function Sl(e) {
  return e === we.EQUALS || Il(e);
}
var ke;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(ke || (ke = {}));
var Ut;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Ut || (Ut = {}));
class yl {
  constructor(t, r, n) {
    this.decodeTree = t, this.emitCodePoint = r, this.errors = n, this.state = ke.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Ut.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = ke.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, r) {
    switch (this.state) {
      case ke.EntityStart:
        return t.charCodeAt(r) === we.NUM ? (this.state = ke.NumericStart, this.consumed += 1, this.stateNumericStart(t, r + 1)) : (this.state = ke.NamedEntity, this.stateNamedEntity(t, r));
      case ke.NumericStart:
        return this.stateNumericStart(t, r);
      case ke.NumericDecimal:
        return this.stateNumericDecimal(t, r);
      case ke.NumericHex:
        return this.stateNumericHex(t, r);
      case ke.NamedEntity:
        return this.stateNamedEntity(t, r);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, r) {
    return r >= t.length ? -1 : (t.charCodeAt(r) | Cl) === we.LOWER_X ? (this.state = ke.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = ke.NumericDecimal, this.stateNumericDecimal(t, r));
  }
  addToNumericResult(t, r, n, u) {
    if (r !== n) {
      const i = n - r;
      this.result = this.result * Math.pow(u, i) + parseInt(t.substr(r, i), u), this.consumed += i;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, r) {
    const n = r;
    for (; r < t.length; ) {
      const u = t.charCodeAt(r);
      if (Yu(u) || Nl(u))
        r += 1;
      else
        return this.addToNumericResult(t, n, r, 16), this.emitNumericEntity(u, 3);
    }
    return this.addToNumericResult(t, n, r, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, r) {
    const n = r;
    for (; r < t.length; ) {
      const u = t.charCodeAt(r);
      if (Yu(u))
        r += 1;
      else
        return this.addToNumericResult(t, n, r, 10), this.emitNumericEntity(u, 2);
    }
    return this.addToNumericResult(t, n, r, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, r) {
    var n;
    if (this.consumed <= r)
      return (n = this.errors) === null || n === void 0 || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === we.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === Ut.Strict)
      return 0;
    return this.emitCodePoint(xs(this.result), this.consumed), this.errors && (t !== we.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, r) {
    const { decodeTree: n } = this;
    let u = n[this.treeIndex], i = (u & ze.VALUE_LENGTH) >> 14;
    for (; r < t.length; r++, this.excess++) {
      const s = t.charCodeAt(r);
      if (this.treeIndex = ia(n, u, this.treeIndex + Math.max(1, i), s), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === Ut.Attribute && // We shouldn't have consumed any characters after the entity,
        (i === 0 || // And there should be no invalid characters.
        Sl(s)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (u = n[this.treeIndex], i = (u & ze.VALUE_LENGTH) >> 14, i !== 0) {
        if (s === we.SEMI)
          return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
        this.decodeMode !== Ut.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: r, decodeTree: n } = this, u = (n[r] & ze.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(r, u, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, r, n) {
    const { decodeTree: u } = this;
    return this.emitCodePoint(r === 1 ? u[t] & ~ze.VALUE_LENGTH : u[t + 1], n), r === 3 && this.emitCodePoint(u[t + 2], n), n;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case ke.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== Ut.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      case ke.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case ke.NumericHex:
        return this.emitNumericEntity(0, 3);
      case ke.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case ke.EntityStart:
        return 0;
    }
  }
}
function Rs(e) {
  let t = "";
  const r = new yl(e, (n) => t += Hu(n));
  return function(u, i) {
    let s = 0, c = 0;
    for (; (c = u.indexOf("&", c)) >= 0; ) {
      t += u.slice(s, c), r.startEntity(i);
      const h = r.write(
        u,
        // Skip the "&"
        c + 1
      );
      if (h < 0) {
        s = c + r.end();
        break;
      }
      s = c + h, c = h === 0 ? s + 1 : s;
    }
    const l = t + u.slice(s);
    return t = "", l;
  };
}
function ia(e, t, r, n) {
  const u = (t & ze.BRANCH_LENGTH) >> 7, i = t & ze.JUMP_TABLE;
  if (u === 0)
    return i !== 0 && n === i ? r : -1;
  if (i) {
    const l = n - i;
    return l < 0 || l >= u ? -1 : e[r + l] - 1;
  }
  let s = r, c = s + u - 1;
  for (; s <= c; ) {
    const l = s + c >>> 1, h = e[l];
    if (h < n)
      s = l + 1;
    else if (h > n)
      c = l - 1;
    else
      return e[l + u];
  }
  return -1;
}
Rs(gt);
Rs(vs);
const hi = /["&'<>$\x80-\uFFFF]/g, Ol = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]), vl = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (e, t) => e.codePointAt(t) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (e, t) => (e.charCodeAt(t) & 64512) === 55296 ? (e.charCodeAt(t) - 55296) * 1024 + e.charCodeAt(t + 1) - 56320 + 65536 : e.charCodeAt(t)
  )
);
function Ls(e) {
  let t = "", r = 0, n;
  for (; (n = hi.exec(e)) !== null; ) {
    const u = n.index, i = e.charCodeAt(u), s = Ol.get(i);
    s !== void 0 ? (t += e.substring(r, u) + s, r = u + 1) : (t += `${e.substring(r, u)}&#x${vl(e, u).toString(16)};`, r = hi.lastIndex += +((i & 64512) === 55296));
  }
  return t + e.substr(r);
}
function Ds(e, t) {
  return function(n) {
    let u, i = 0, s = "";
    for (; u = e.exec(n); )
      i !== u.index && (s += n.substring(i, u.index)), s += t.get(u[0].charCodeAt(0)), i = u.index + 1;
    return s + n.substring(i);
  };
}
const Ps = Ds(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
])), Ms = Ds(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
])), xl = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((e) => [e.toLowerCase(), e])), Rl = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((e) => [e.toLowerCase(), e])), Ll = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function Dl(e) {
  return e.replace(/"/g, "&quot;");
}
function Pl(e, t) {
  var r;
  if (!e)
    return;
  const n = ((r = t.encodeEntities) !== null && r !== void 0 ? r : t.decodeEntities) === !1 ? Dl : t.xmlMode || t.encodeEntities !== "utf8" ? Ls : Ps;
  return Object.keys(e).map((u) => {
    var i, s;
    const c = (i = e[u]) !== null && i !== void 0 ? i : "";
    return t.xmlMode === "foreign" && (u = (s = Rl.get(u)) !== null && s !== void 0 ? s : u), !t.emptyAttrs && !t.xmlMode && c === "" ? u : `${u}="${n(c)}"`;
  }).join(" ");
}
const Ei = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function sr(e, t = {}) {
  const r = "length" in e ? e : [e];
  let n = "";
  for (let u = 0; u < r.length; u++)
    n += Ml(r[u], t);
  return n;
}
function Ml(e, t) {
  switch (e.type) {
    case gs:
      return sr(e.children, t);
    case Os:
    case As:
      return Fl(e);
    case Cs:
      return Yl(e);
    case ys:
      return Hl(e);
    case Ns:
    case Is:
    case Ss:
      return Bl(e, t);
    case _s:
      return Ul(e, t);
  }
}
const kl = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), wl = /* @__PURE__ */ new Set(["svg", "math"]);
function Bl(e, t) {
  var r;
  t.xmlMode === "foreign" && (e.name = (r = xl.get(e.name)) !== null && r !== void 0 ? r : e.name, e.parent && kl.has(e.parent.name) && (t = { ...t, xmlMode: !1 })), !t.xmlMode && wl.has(e.name) && (t = { ...t, xmlMode: "foreign" });
  let n = `<${e.name}`;
  const u = Pl(e.attribs, t);
  return u && (n += ` ${u}`), e.children.length === 0 && (t.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    t.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    t.selfClosingTags && Ei.has(e.name)
  )) ? (t.xmlMode || (n += " "), n += "/>") : (n += ">", e.children.length > 0 && (n += sr(e.children, t)), (t.xmlMode || !Ei.has(e.name)) && (n += `</${e.name}>`)), n;
}
function Fl(e) {
  return `<${e.data}>`;
}
function Ul(e, t) {
  var r;
  let n = e.data || "";
  return ((r = t.encodeEntities) !== null && r !== void 0 ? r : t.decodeEntities) !== !1 && !(!t.xmlMode && e.parent && Ll.has(e.parent.name)) && (n = t.xmlMode || t.encodeEntities !== "utf8" ? Ls(n) : Ms(n)), n;
}
function Hl(e) {
  return `<![CDATA[${e.children[0].data}]]>`;
}
function Yl(e) {
  return `<!--${e.data}-->`;
}
const $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sr,
  render: sr
}, Symbol.toStringTag, { value: "Module" }));
function ks(e, t) {
  return sr(e, t);
}
function ql(e, t) {
  return Le(e) ? e.children.map((r) => ks(r, t)).join("") : "";
}
function An(e) {
  return Array.isArray(e) ? e.map(An).join("") : Z(e) ? e.name === "br" ? `
` : An(e.children) : Gr(e) ? An(e.children) : nt(e) ? e.data : "";
}
function or(e) {
  return Array.isArray(e) ? e.map(or).join("") : Le(e) && !Wr(e) ? or(e.children) : nt(e) ? e.data : "";
}
function Sn(e) {
  return Array.isArray(e) ? e.map(Sn).join("") : Le(e) && (e.type === ce.Tag || Gr(e)) ? Sn(e.children) : nt(e) ? e.data : "";
}
function Wn(e) {
  return Le(e) ? e.children : [];
}
function ws(e) {
  return e.parent || null;
}
function Bs(e) {
  const t = ws(e);
  if (t != null)
    return Wn(t);
  const r = [e];
  let { prev: n, next: u } = e;
  for (; n != null; )
    r.unshift(n), { prev: n } = n;
  for (; u != null; )
    r.push(u), { next: u } = u;
  return r;
}
function jl(e, t) {
  var r;
  return (r = e.attribs) === null || r === void 0 ? void 0 : r[t];
}
function Gl(e, t) {
  return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, t) && e.attribs[t] != null;
}
function Wl(e) {
  return e.name;
}
function sa(e) {
  let { next: t } = e;
  for (; t !== null && !Z(t); )
    ({ next: t } = t);
  return t;
}
function oa(e) {
  let { prev: t } = e;
  for (; t !== null && !Z(t); )
    ({ prev: t } = t);
  return t;
}
function Wt(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    const t = e.parent.children, r = t.lastIndexOf(e);
    r >= 0 && t.splice(r, 1);
  }
  e.next = null, e.prev = null, e.parent = null;
}
function Ql(e, t) {
  const r = t.prev = e.prev;
  r && (r.next = t);
  const n = t.next = e.next;
  n && (n.prev = t);
  const u = t.parent = e.parent;
  if (u) {
    const i = u.children;
    i[i.lastIndexOf(e)] = t, e.parent = null;
  }
}
function Vl(e, t) {
  if (Wt(t), t.next = null, t.parent = e, e.children.push(t) > 1) {
    const r = e.children[e.children.length - 2];
    r.next = t, t.prev = r;
  } else
    t.prev = null;
}
function Xl(e, t) {
  Wt(t);
  const { parent: r } = e, n = e.next;
  if (t.next = n, t.prev = e, e.next = t, t.parent = r, n) {
    if (n.prev = t, r) {
      const u = r.children;
      u.splice(u.lastIndexOf(n), 0, t);
    }
  } else
    r && r.children.push(t);
}
function Kl(e, t) {
  if (Wt(t), t.parent = e, t.prev = null, e.children.unshift(t) !== 1) {
    const r = e.children[1];
    r.prev = t, t.next = r;
  } else
    t.next = null;
}
function zl(e, t) {
  Wt(t);
  const { parent: r } = e;
  if (r) {
    const n = r.children;
    n.splice(n.indexOf(e), 0, t);
  }
  e.prev && (e.prev.next = t), t.parent = r, t.prev = e.prev, t.next = e, e.prev = t;
}
function Qn(e, t, r = !0, n = 1 / 0) {
  return ca(e, Array.isArray(t) ? t : [t], r, n);
}
function ca(e, t, r, n) {
  const u = [], i = [t], s = [0];
  for (; ; ) {
    if (s[0] >= i[0].length) {
      if (s.length === 1)
        return u;
      i.shift(), s.shift();
      continue;
    }
    const c = i[0][s[0]++];
    if (e(c) && (u.push(c), --n <= 0))
      return u;
    r && Le(c) && c.children.length > 0 && (s.unshift(0), i.unshift(c.children));
  }
}
function Zl(e, t) {
  return t.find(e);
}
function la(e, t, r = !0) {
  let n = null;
  for (let u = 0; u < t.length && !n; u++) {
    const i = t[u];
    if (Z(i))
      e(i) ? n = i : r && i.children.length > 0 && (n = la(e, i.children, !0));
    else
      continue;
  }
  return n;
}
function Fs(e, t) {
  return t.some((r) => Z(r) && (e(r) || Fs(e, r.children)));
}
function Jl(e, t) {
  const r = [], n = [t], u = [0];
  for (; ; ) {
    if (u[0] >= n[0].length) {
      if (n.length === 1)
        return r;
      n.shift(), u.shift();
      continue;
    }
    const i = n[0][u[0]++];
    Z(i) && (e(i) && r.push(i), i.children.length > 0 && (u.unshift(0), n.unshift(i.children)));
  }
}
const yn = {
  tag_name(e) {
    return typeof e == "function" ? (t) => Z(t) && e(t.name) : e === "*" ? Z : (t) => Z(t) && t.name === e;
  },
  tag_type(e) {
    return typeof e == "function" ? (t) => e(t.type) : (t) => t.type === e;
  },
  tag_contains(e) {
    return typeof e == "function" ? (t) => nt(t) && e(t.data) : (t) => nt(t) && t.data === e;
  }
};
function Us(e, t) {
  return typeof t == "function" ? (r) => Z(r) && t(r.attribs[e]) : (r) => Z(r) && r.attribs[e] === t;
}
function ef(e, t) {
  return (r) => e(r) || t(r);
}
function Hs(e) {
  const t = Object.keys(e).map((r) => {
    const n = e[r];
    return Object.prototype.hasOwnProperty.call(yn, r) ? yn[r](n) : Us(r, n);
  });
  return t.length === 0 ? null : t.reduce(ef);
}
function tf(e, t) {
  const r = Hs(e);
  return r ? r(t) : !0;
}
function rf(e, t, r, n = 1 / 0) {
  const u = Hs(e);
  return u ? Qn(u, t, r, n) : [];
}
function nf(e, t, r = !0) {
  return Array.isArray(t) || (t = [t]), la(Us("id", e), t, r);
}
function Tr(e, t, r = !0, n = 1 / 0) {
  return Qn(yn.tag_name(e), t, r, n);
}
function uf(e, t, r = !0, n = 1 / 0) {
  return Qn(yn.tag_type(e), t, r, n);
}
function af(e) {
  let t = e.length;
  for (; --t >= 0; ) {
    const r = e[t];
    if (t > 0 && e.lastIndexOf(r, t - 1) >= 0) {
      e.splice(t, 1);
      continue;
    }
    for (let n = r.parent; n; n = n.parent)
      if (e.includes(n)) {
        e.splice(t, 1);
        break;
      }
  }
  return e;
}
var tt;
(function(e) {
  e[e.DISCONNECTED = 1] = "DISCONNECTED", e[e.PRECEDING = 2] = "PRECEDING", e[e.FOLLOWING = 4] = "FOLLOWING", e[e.CONTAINS = 8] = "CONTAINS", e[e.CONTAINED_BY = 16] = "CONTAINED_BY";
})(tt || (tt = {}));
function Ys(e, t) {
  const r = [], n = [];
  if (e === t)
    return 0;
  let u = Le(e) ? e : e.parent;
  for (; u; )
    r.unshift(u), u = u.parent;
  for (u = Le(t) ? t : t.parent; u; )
    n.unshift(u), u = u.parent;
  const i = Math.min(r.length, n.length);
  let s = 0;
  for (; s < i && r[s] === n[s]; )
    s++;
  if (s === 0)
    return tt.DISCONNECTED;
  const c = r[s - 1], l = c.children, h = r[s], T = n[s];
  return l.indexOf(h) > l.indexOf(T) ? c === t ? tt.FOLLOWING | tt.CONTAINED_BY : tt.FOLLOWING : c === e ? tt.PRECEDING | tt.CONTAINS : tt.PRECEDING;
}
function br(e) {
  return e = e.filter((t, r, n) => !n.includes(t, r + 1)), e.sort((t, r) => {
    const n = Ys(t, r);
    return n & tt.PRECEDING ? -1 : n & tt.FOLLOWING ? 1 : 0;
  }), e;
}
function fa(e) {
  const t = On(ff, e);
  return t ? t.name === "feed" ? sf(t) : of(t) : null;
}
function sf(e) {
  var t;
  const r = e.children, n = {
    type: "atom",
    items: Tr("entry", r).map((s) => {
      var c;
      const { children: l } = s, h = { media: $s(l) };
      Xe(h, "id", "id", l), Xe(h, "title", "title", l);
      const T = (c = On("link", l)) === null || c === void 0 ? void 0 : c.attribs.href;
      T && (h.link = T);
      const _ = Ot("summary", l) || Ot("content", l);
      _ && (h.description = _);
      const C = Ot("updated", l);
      return C && (h.pubDate = new Date(C)), h;
    })
  };
  Xe(n, "id", "id", r), Xe(n, "title", "title", r);
  const u = (t = On("link", r)) === null || t === void 0 ? void 0 : t.attribs.href;
  u && (n.link = u), Xe(n, "description", "subtitle", r);
  const i = Ot("updated", r);
  return i && (n.updated = new Date(i)), Xe(n, "author", "email", r, !0), n;
}
function of(e) {
  var t, r;
  const n = (r = (t = On("channel", e.children)) === null || t === void 0 ? void 0 : t.children) !== null && r !== void 0 ? r : [], u = {
    type: e.name.substr(0, 3),
    id: "",
    items: Tr("item", e.children).map((s) => {
      const { children: c } = s, l = { media: $s(c) };
      Xe(l, "id", "guid", c), Xe(l, "title", "title", c), Xe(l, "link", "link", c), Xe(l, "description", "description", c);
      const h = Ot("pubDate", c) || Ot("dc:date", c);
      return h && (l.pubDate = new Date(h)), l;
    })
  };
  Xe(u, "title", "title", n), Xe(u, "link", "link", n), Xe(u, "description", "description", n);
  const i = Ot("lastBuildDate", n);
  return i && (u.updated = new Date(i)), Xe(u, "author", "managingEditor", n, !0), u;
}
const cf = ["url", "type", "lang"], lf = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function $s(e) {
  return Tr("media:content", e).map((t) => {
    const { attribs: r } = t, n = {
      medium: r.medium,
      isDefault: !!r.isDefault
    };
    for (const u of cf)
      r[u] && (n[u] = r[u]);
    for (const u of lf)
      r[u] && (n[u] = parseInt(r[u], 10));
    return r.expression && (n.expression = r.expression), n;
  });
}
function On(e, t) {
  return Tr(e, t, !0, 1)[0];
}
function Ot(e, t, r = !1) {
  return or(Tr(e, t, r, 1)).trim();
}
function Xe(e, t, r, n, u = !1) {
  const i = Ot(r, n, u);
  i && (e[t] = i);
}
function ff(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
const pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return tt;
  },
  append: Xl,
  appendChild: Vl,
  compareDocumentPosition: Ys,
  existsOne: Fs,
  filter: Qn,
  find: ca,
  findAll: Jl,
  findOne: la,
  findOneChild: Zl,
  getAttributeValue: jl,
  getChildren: Wn,
  getElementById: nf,
  getElements: rf,
  getElementsByTagName: Tr,
  getElementsByTagType: uf,
  getFeed: fa,
  getInnerHTML: ql,
  getName: Wl,
  getOuterHTML: ks,
  getParent: ws,
  getSiblings: Bs,
  getText: An,
  hasAttrib: Gl,
  hasChildren: Le,
  innerText: Sn,
  isCDATA: Gr,
  isComment: Wr,
  isDocument: Rt,
  isTag: Z,
  isText: nt,
  nextElementSibling: sa,
  prepend: zl,
  prependChild: Kl,
  prevElementSibling: oa,
  removeElement: Wt,
  removeSubsets: af,
  replaceElement: Ql,
  testElement: tf,
  textContent: or,
  uniqueSort: br
}, Symbol.toStringTag, { value: "Module" })), Qr = /* @__PURE__ */ Gt(pr);
var $t = q && q.__assign || function() {
  return $t = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var u in t)
        Object.prototype.hasOwnProperty.call(t, u) && (e[u] = t[u]);
    }
    return e;
  }, $t.apply(this, arguments);
}, df = q && q.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var u = Object.getOwnPropertyDescriptor(t, r);
  (!u || ("get" in u ? !t.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, u);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), hf = q && q.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Ef = q && q.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && df(t, e, r);
  return hf(t, e), t;
};
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.merge = Ie.contains = Ie.root = Ie.parseHTML = Ie.text = Ie.xml = Ie.html = void 0;
var mf = Qr, $u = Ef(mr);
function qs(e, t, r) {
  return e ? e(t ?? e._root.children, null, void 0, r).toString() : "";
}
function Tf(e, t) {
  return !t && typeof e == "object" && e != null && !("length" in e) && !("type" in e);
}
function bf(e, t) {
  var r = Tf(e) ? (t = e, void 0) : e, n = $t($t($t({}, $u.default), this === null || this === void 0 ? void 0 : this._options), (0, $u.flatten)(t ?? {}));
  return qs(this, r, n);
}
Ie.html = bf;
function pf(e) {
  var t = $t($t({}, this._options), { xmlMode: !0 });
  return qs(this, e, t);
}
Ie.xml = pf;
function gf(e) {
  for (var t = e || (this ? this.root() : []), r = "", n = 0; n < t.length; n++)
    r += (0, mf.textContent)(t[n]);
  return r;
}
Ie.text = gf;
function _f(e, t, r) {
  if (r === void 0 && (r = typeof t == "boolean" ? t : !1), !e || typeof e != "string")
    return null;
  typeof t == "boolean" && (r = t);
  var n = this.load(e, $u.default, !1);
  return r || n("script").remove(), n.root()[0].children.slice();
}
Ie.parseHTML = _f;
function Af() {
  return this(this._root);
}
Ie.root = Af;
function Cf(e, t) {
  if (t === e)
    return !1;
  for (var r = t; r && r !== r.parent; )
    if (r = r.parent, r === e)
      return !0;
  return !1;
}
Ie.contains = Cf;
function Nf(e, t) {
  if (!(!mi(e) || !mi(t))) {
    for (var r = e.length, n = +t.length, u = 0; u < n; u++)
      e[r++] = t[u];
    return e.length = r, e;
  }
}
Ie.merge = Nf;
function mi(e) {
  if (Array.isArray(e))
    return !0;
  if (typeof e != "object" || !Object.prototype.hasOwnProperty.call(e, "length") || typeof e.length != "number" || e.length < 0)
    return !1;
  for (var t = 0; t < e.length; t++)
    if (!(t in e))
      return !1;
  return !0;
}
var Vn = {}, ye = {}, Qt = {};
const cr = /* @__PURE__ */ Gt(_l);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.isHtml = e.cloneDom = e.domEach = e.cssCase = e.camelCase = e.isCheerio = e.isTag = void 0;
  var t = cr, r = cr;
  Object.defineProperty(e, "isTag", { enumerable: !0, get: function() {
    return r.isTag;
  } });
  function n(T) {
    return T.cheerio != null;
  }
  e.isCheerio = n;
  function u(T) {
    return T.replace(/[_.-](\w|$)/g, function(_, C) {
      return C.toUpperCase();
    });
  }
  e.camelCase = u;
  function i(T) {
    return T.replace(/[A-Z]/g, "-$&").toLowerCase();
  }
  e.cssCase = i;
  function s(T, _) {
    for (var C = T.length, p = 0; p < C; p++)
      _(T[p], p);
    return T;
  }
  e.domEach = s;
  function c(T) {
    var _ = "length" in T ? Array.prototype.map.call(T, function(p) {
      return (0, t.cloneNode)(p, !0);
    }) : [(0, t.cloneNode)(T, !0)], C = new t.Document(_);
    return _.forEach(function(p) {
      p.parent = C;
    }), _;
  }
  e.cloneDom = c;
  var l;
  (function(T) {
    T[T.LowerA = 97] = "LowerA", T[T.LowerZ = 122] = "LowerZ", T[T.UpperA = 65] = "UpperA", T[T.UpperZ = 90] = "UpperZ", T[T.Exclamation = 33] = "Exclamation";
  })(l || (l = {}));
  function h(T) {
    var _ = T.indexOf("<");
    if (_ < 0 || _ > T.length - 3)
      return !1;
    var C = T.charCodeAt(_ + 1);
    return (C >= l.LowerA && C <= l.LowerZ || C >= l.UpperA && C <= l.UpperZ || C === l.Exclamation) && T.includes(">", _ + 2);
  }
  e.isHtml = h;
})(Qt);
Object.defineProperty(ye, "__esModule", { value: !0 });
ye.toggleClass = ye.removeClass = ye.addClass = ye.hasClass = ye.removeAttr = ye.val = ye.data = ye.prop = ye.attr = void 0;
var js = Ie, he = Qt, Ti = Qr, tr = Object.prototype.hasOwnProperty, Hr = /\s+/, yu = "data-", bi = {
  null: null,
  true: !0,
  false: !1
}, da = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, If = /^{[^]*}$|^\[[^]*]$/;
function vn(e, t, r) {
  var n;
  if (!(!e || !(0, he.isTag)(e))) {
    if ((n = e.attribs) !== null && n !== void 0 || (e.attribs = {}), !t)
      return e.attribs;
    if (tr.call(e.attribs, t))
      return !r && da.test(t) ? t : e.attribs[t];
    if (e.name === "option" && t === "value")
      return (0, js.text)(e.children);
    if (e.name === "input" && (e.attribs.type === "radio" || e.attribs.type === "checkbox") && t === "value")
      return "on";
  }
}
function rr(e, t, r) {
  r === null ? Gs(e, t) : e.attribs[t] = "".concat(r);
}
function Sf(e, t) {
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e != "string")
        throw new Error("Bad combination of arguments.");
      return (0, he.domEach)(this, function(r, n) {
        (0, he.isTag)(r) && rr(r, e, t.call(r, n, r.attribs[e]));
      });
    }
    return (0, he.domEach)(this, function(r) {
      (0, he.isTag)(r) && (typeof e == "object" ? Object.keys(e).forEach(function(n) {
        var u = e[n];
        rr(r, n, u);
      }) : rr(r, e, t));
    });
  }
  return arguments.length > 1 ? this : vn(this[0], e, this.options.xmlMode);
}
ye.attr = Sf;
function pi(e, t, r) {
  return t in e ? (
    // @ts-expect-error TS doesn't like us accessing the value directly here.
    e[t]
  ) : !r && da.test(t) ? vn(e, t, !1) !== void 0 : vn(e, t, r);
}
function Ou(e, t, r, n) {
  t in e ? e[t] = r : rr(e, t, !n && da.test(t) ? r ? "" : null : "".concat(r));
}
function yf(e, t) {
  var r = this, n;
  if (typeof e == "string" && t === void 0) {
    var u = this[0];
    if (!u || !(0, he.isTag)(u))
      return;
    switch (e) {
      case "style": {
        var i = this.css(), s = Object.keys(i);
        return s.forEach(function(l, h) {
          i[h] = l;
        }), i.length = s.length, i;
      }
      case "tagName":
      case "nodeName":
        return u.name.toUpperCase();
      case "href":
      case "src": {
        var c = (n = u.attribs) === null || n === void 0 ? void 0 : n[e];
        return typeof URL < "u" && (e === "href" && (u.tagName === "a" || u.name === "link") || e === "src" && (u.tagName === "img" || u.tagName === "iframe" || u.tagName === "audio" || u.tagName === "video" || u.tagName === "source")) && c !== void 0 && this.options.baseURI ? new URL(c, this.options.baseURI).href : c;
      }
      case "innerText":
        return (0, Ti.innerText)(u);
      case "textContent":
        return (0, Ti.textContent)(u);
      case "outerHTML":
        return this.clone().wrap("<container />").parent().html();
      case "innerHTML":
        return this.html();
      default:
        return pi(u, e, this.options.xmlMode);
    }
  }
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e == "object")
        throw new Error("Bad combination of arguments.");
      return (0, he.domEach)(this, function(l, h) {
        (0, he.isTag)(l) && Ou(l, e, t.call(l, h, pi(l, e, r.options.xmlMode)), r.options.xmlMode);
      });
    }
    return (0, he.domEach)(this, function(l) {
      (0, he.isTag)(l) && (typeof e == "object" ? Object.keys(e).forEach(function(h) {
        var T = e[h];
        Ou(l, h, T, r.options.xmlMode);
      }) : Ou(l, e, t, r.options.xmlMode));
    });
  }
}
ye.prop = yf;
function gi(e, t, r) {
  var n, u = e;
  (n = u.data) !== null && n !== void 0 || (u.data = {}), typeof t == "object" ? Object.assign(u.data, t) : typeof t == "string" && r !== void 0 && (u.data[t] = r);
}
function _i(e, t) {
  var r, n, u;
  t == null ? (r = Object.keys(e.attribs).filter(function(l) {
    return l.startsWith(yu);
  }), n = r.map(function(l) {
    return (0, he.camelCase)(l.slice(yu.length));
  })) : (r = [yu + (0, he.cssCase)(t)], n = [t]);
  for (var i = 0; i < r.length; ++i) {
    var s = r[i], c = n[i];
    if (tr.call(e.attribs, s) && !tr.call(e.data, c)) {
      if (u = e.attribs[s], tr.call(bi, u))
        u = bi[u];
      else if (u === String(Number(u)))
        u = Number(u);
      else if (If.test(u))
        try {
          u = JSON.parse(u);
        } catch {
        }
      e.data[c] = u;
    }
  }
  return t == null ? e.data : u;
}
function Of(e, t) {
  var r, n = this[0];
  if (!(!n || !(0, he.isTag)(n))) {
    var u = n;
    return (r = u.data) !== null && r !== void 0 || (u.data = {}), e ? typeof e == "object" || t !== void 0 ? ((0, he.domEach)(this, function(i) {
      (0, he.isTag)(i) && (typeof e == "object" ? gi(i, e) : gi(i, e, t));
    }), this) : tr.call(u.data, e) ? u.data[e] : _i(u, e) : _i(u);
  }
}
ye.data = Of;
function vf(e) {
  var t = arguments.length === 0, r = this[0];
  if (!r || !(0, he.isTag)(r))
    return t ? void 0 : this;
  switch (r.name) {
    case "textarea":
      return this.text(e);
    case "select": {
      var n = this.find("option:selected");
      if (!t) {
        if (this.attr("multiple") == null && typeof e == "object")
          return this;
        this.find("option").removeAttr("selected");
        for (var u = typeof e != "object" ? [e] : e, i = 0; i < u.length; i++)
          this.find('option[value="'.concat(u[i], '"]')).attr("selected", "");
        return this;
      }
      return this.attr("multiple") ? n.toArray().map(function(s) {
        return (0, js.text)(s.children);
      }) : n.attr("value");
    }
    case "input":
    case "option":
      return t ? this.attr("value") : this.attr("value", e);
  }
}
ye.val = vf;
function Gs(e, t) {
  !e.attribs || !tr.call(e.attribs, t) || delete e.attribs[t];
}
function xn(e) {
  return e ? e.trim().split(Hr) : [];
}
function xf(e) {
  for (var t = xn(e), r = function(i) {
    (0, he.domEach)(n, function(s) {
      (0, he.isTag)(s) && Gs(s, t[i]);
    });
  }, n = this, u = 0; u < t.length; u++)
    r(u);
  return this;
}
ye.removeAttr = xf;
function Rf(e) {
  return this.toArray().some(function(t) {
    var r = (0, he.isTag)(t) && t.attribs.class, n = -1;
    if (r && e.length)
      for (; (n = r.indexOf(e, n + 1)) > -1; ) {
        var u = n + e.length;
        if ((n === 0 || Hr.test(r[n - 1])) && (u === r.length || Hr.test(r[u])))
          return !0;
      }
    return !1;
  });
}
ye.hasClass = Rf;
function Ws(e) {
  if (typeof e == "function")
    return (0, he.domEach)(this, function(h, T) {
      if ((0, he.isTag)(h)) {
        var _ = h.attribs.class || "";
        Ws.call([h], e.call(h, T, _));
      }
    });
  if (!e || typeof e != "string")
    return this;
  for (var t = e.split(Hr), r = this.length, n = 0; n < r; n++) {
    var u = this[n];
    if ((0, he.isTag)(u)) {
      var i = vn(u, "class", !1);
      if (!i)
        rr(u, "class", t.join(" ").trim());
      else {
        for (var s = " ".concat(i, " "), c = 0; c < t.length; c++) {
          var l = "".concat(t[c], " ");
          s.includes(" ".concat(l)) || (s += l);
        }
        rr(u, "class", s.trim());
      }
    }
  }
  return this;
}
ye.addClass = Ws;
function Qs(e) {
  if (typeof e == "function")
    return (0, he.domEach)(this, function(u, i) {
      (0, he.isTag)(u) && Qs.call([u], e.call(u, i, u.attribs.class || ""));
    });
  var t = xn(e), r = t.length, n = arguments.length === 0;
  return (0, he.domEach)(this, function(u) {
    if ((0, he.isTag)(u))
      if (n)
        u.attribs.class = "";
      else {
        for (var i = xn(u.attribs.class), s = !1, c = 0; c < r; c++) {
          var l = i.indexOf(t[c]);
          l >= 0 && (i.splice(l, 1), s = !0, c--);
        }
        s && (u.attribs.class = i.join(" "));
      }
  });
}
ye.removeClass = Qs;
function Vs(e, t) {
  if (typeof e == "function")
    return (0, he.domEach)(this, function(_, C) {
      (0, he.isTag)(_) && Vs.call([_], e.call(_, C, _.attribs.class || "", t), t);
    });
  if (!e || typeof e != "string")
    return this;
  for (var r = e.split(Hr), n = r.length, u = typeof t == "boolean" ? t ? 1 : -1 : 0, i = this.length, s = 0; s < i; s++) {
    var c = this[s];
    if ((0, he.isTag)(c)) {
      for (var l = xn(c.attribs.class), h = 0; h < n; h++) {
        var T = l.indexOf(r[h]);
        u >= 0 && T < 0 ? l.push(r[h]) : u <= 0 && T >= 0 && l.splice(T, 1);
      }
      c.attribs.class = l.join(" ");
    }
  }
  return this;
}
ye.toggleClass = Vs;
var $ = {}, K;
(function(e) {
  e.Attribute = "attribute", e.Pseudo = "pseudo", e.PseudoElement = "pseudo-element", e.Tag = "tag", e.Universal = "universal", e.Adjacent = "adjacent", e.Child = "child", e.Descendant = "descendant", e.Parent = "parent", e.Sibling = "sibling", e.ColumnCombinator = "column-combinator";
})(K || (K = {}));
var xe;
(function(e) {
  e.Any = "any", e.Element = "element", e.End = "end", e.Equals = "equals", e.Exists = "exists", e.Hyphen = "hyphen", e.Not = "not", e.Start = "start";
})(xe || (xe = {}));
const Ai = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, Lf = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, Df = /* @__PURE__ */ new Map([
  [126, xe.Element],
  [94, xe.Start],
  [36, xe.End],
  [42, xe.Any],
  [33, xe.Not],
  [124, xe.Hyphen]
]), Pf = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function Dr(e) {
  switch (e.type) {
    case K.Adjacent:
    case K.Child:
    case K.Descendant:
    case K.Parent:
    case K.Sibling:
    case K.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const Mf = /* @__PURE__ */ new Set(["contains", "icontains"]);
function kf(e, t, r) {
  const n = parseInt(t, 16) - 65536;
  return n !== n || r ? t : n < 0 ? (
    // BMP codepoint
    String.fromCharCode(n + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320)
  );
}
function yr(e) {
  return e.replace(Lf, kf);
}
function vu(e) {
  return e === 39 || e === 34;
}
function Ci(e) {
  return e === 32 || e === 9 || e === 10 || e === 12 || e === 13;
}
function Xn(e) {
  const t = [], r = Xs(t, `${e}`, 0);
  if (r < e.length)
    throw new Error(`Unmatched selector: ${e.slice(r)}`);
  return t;
}
function Xs(e, t, r) {
  let n = [];
  function u(C) {
    const p = t.slice(r + C).match(Ai);
    if (!p)
      throw new Error(`Expected name, found ${t.slice(r)}`);
    const [g] = p;
    return r += C + g.length, yr(g);
  }
  function i(C) {
    for (r += C; r < t.length && Ci(t.charCodeAt(r)); )
      r++;
  }
  function s() {
    r += 1;
    const C = r;
    let p = 1;
    for (; p > 0 && r < t.length; r++)
      t.charCodeAt(r) === 40 && !c(r) ? p++ : t.charCodeAt(r) === 41 && !c(r) && p--;
    if (p)
      throw new Error("Parenthesis not matched");
    return yr(t.slice(C, r - 1));
  }
  function c(C) {
    let p = 0;
    for (; t.charCodeAt(--C) === 92; )
      p++;
    return (p & 1) === 1;
  }
  function l() {
    if (n.length > 0 && Dr(n[n.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }
  function h(C) {
    if (n.length > 0 && n[n.length - 1].type === K.Descendant) {
      n[n.length - 1].type = C;
      return;
    }
    l(), n.push({ type: C });
  }
  function T(C, p) {
    n.push({
      type: K.Attribute,
      name: C,
      action: p,
      value: u(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function _() {
    if (n.length && n[n.length - 1].type === K.Descendant && n.pop(), n.length === 0)
      throw new Error("Empty sub-selector");
    e.push(n);
  }
  if (i(0), t.length === r)
    return r;
  e:
    for (; r < t.length; ) {
      const C = t.charCodeAt(r);
      switch (C) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          (n.length === 0 || n[0].type !== K.Descendant) && (l(), n.push({ type: K.Descendant })), i(1);
          break;
        }
        case 62: {
          h(K.Child), i(1);
          break;
        }
        case 60: {
          h(K.Parent), i(1);
          break;
        }
        case 126: {
          h(K.Sibling), i(1);
          break;
        }
        case 43: {
          h(K.Adjacent), i(1);
          break;
        }
        case 46: {
          T("class", xe.Element);
          break;
        }
        case 35: {
          T("id", xe.Equals);
          break;
        }
        case 91: {
          i(1);
          let p, g = null;
          t.charCodeAt(r) === 124 ? p = u(1) : t.startsWith("*|", r) ? (g = "*", p = u(2)) : (p = u(0), t.charCodeAt(r) === 124 && t.charCodeAt(r + 1) !== 61 && (g = p, p = u(1))), i(0);
          let O = xe.Exists;
          const M = Df.get(t.charCodeAt(r));
          if (M) {
            if (O = M, t.charCodeAt(r + 1) !== 61)
              throw new Error("Expected `=`");
            i(2);
          } else
            t.charCodeAt(r) === 61 && (O = xe.Equals, i(1));
          let Y = "", W = null;
          if (O !== "exists") {
            if (vu(t.charCodeAt(r))) {
              const R = t.charCodeAt(r);
              let w = r + 1;
              for (; w < t.length && (t.charCodeAt(w) !== R || c(w)); )
                w += 1;
              if (t.charCodeAt(w) !== R)
                throw new Error("Attribute value didn't end");
              Y = yr(t.slice(r + 1, w)), r = w + 1;
            } else {
              const R = r;
              for (; r < t.length && (!Ci(t.charCodeAt(r)) && t.charCodeAt(r) !== 93 || c(r)); )
                r += 1;
              Y = yr(t.slice(R, r));
            }
            i(0);
            const k = t.charCodeAt(r) | 32;
            k === 115 ? (W = !1, i(1)) : k === 105 && (W = !0, i(1));
          }
          if (t.charCodeAt(r) !== 93)
            throw new Error("Attribute selector didn't terminate");
          r += 1;
          const Q = {
            type: K.Attribute,
            name: p,
            action: O,
            value: Y,
            namespace: g,
            ignoreCase: W
          };
          n.push(Q);
          break;
        }
        case 58: {
          if (t.charCodeAt(r + 1) === 58) {
            n.push({
              type: K.PseudoElement,
              name: u(2).toLowerCase(),
              data: t.charCodeAt(r) === 40 ? s() : null
            });
            continue;
          }
          const p = u(1).toLowerCase();
          let g = null;
          if (t.charCodeAt(r) === 40)
            if (Pf.has(p)) {
              if (vu(t.charCodeAt(r + 1)))
                throw new Error(`Pseudo-selector ${p} cannot be quoted`);
              if (g = [], r = Xs(g, t, r + 1), t.charCodeAt(r) !== 41)
                throw new Error(`Missing closing parenthesis in :${p} (${t})`);
              r += 1;
            } else {
              if (g = s(), Mf.has(p)) {
                const O = g.charCodeAt(0);
                O === g.charCodeAt(g.length - 1) && vu(O) && (g = g.slice(1, -1));
              }
              g = yr(g);
            }
          n.push({ type: K.Pseudo, name: p, data: g });
          break;
        }
        case 44: {
          _(), n = [], i(1);
          break;
        }
        default: {
          if (t.startsWith("/*", r)) {
            const O = t.indexOf("*/", r + 2);
            if (O < 0)
              throw new Error("Comment was not terminated");
            r = O + 2, n.length === 0 && i(0);
            break;
          }
          let p = null, g;
          if (C === 42)
            r += 1, g = "*";
          else if (C === 124) {
            if (g = "", t.charCodeAt(r + 1) === 124) {
              h(K.ColumnCombinator), i(2);
              break;
            }
          } else if (Ai.test(t.slice(r)))
            g = u(0);
          else
            break e;
          t.charCodeAt(r) === 124 && t.charCodeAt(r + 1) !== 124 && (p = g, t.charCodeAt(r + 1) === 42 ? (g = "*", r += 2) : g = u(1)), n.push(g === "*" ? { type: K.Universal, namespace: p } : { type: K.Tag, name: g, namespace: p });
        }
      }
    }
  return _(), r;
}
var Rn = {
  trueFunc: function() {
    return !0;
  },
  falseFunc: function() {
    return !1;
  }
};
const ne = /* @__PURE__ */ Er(Rn), Ks = /* @__PURE__ */ new Map([
  [K.Universal, 50],
  [K.Tag, 30],
  [K.Attribute, 1],
  [K.Pseudo, 0]
]);
function ha(e) {
  return !Ks.has(e.type);
}
const wf = /* @__PURE__ */ new Map([
  [xe.Exists, 10],
  [xe.Equals, 8],
  [xe.Not, 7],
  [xe.Start, 6],
  [xe.End, 6],
  [xe.Any, 5]
]);
function Bf(e) {
  const t = e.map(zs);
  for (let r = 1; r < e.length; r++) {
    const n = t[r];
    if (!(n < 0))
      for (let u = r - 1; u >= 0 && n < t[u]; u--) {
        const i = e[u + 1];
        e[u + 1] = e[u], e[u] = i, t[u + 1] = t[u], t[u] = n;
      }
  }
}
function zs(e) {
  var t, r;
  let n = (t = Ks.get(e.type)) !== null && t !== void 0 ? t : -1;
  return e.type === K.Attribute ? (n = (r = wf.get(e.action)) !== null && r !== void 0 ? r : 4, e.action === xe.Equals && e.name === "id" && (n = 9), e.ignoreCase && (n >>= 1)) : e.type === K.Pseudo && (e.data ? e.name === "has" || e.name === "contains" ? n = 0 : Array.isArray(e.data) ? (n = Math.min(...e.data.map((u) => Math.min(...u.map(zs)))), n < 0 && (n = 0)) : n = 2 : n = 3), n;
}
const Ff = /[-[\]{}()*+?.,\\^$|#\s]/g;
function Ni(e) {
  return e.replace(Ff, "\\$&");
}
const Uf = /* @__PURE__ */ new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
function wt(e, t) {
  return typeof e.ignoreCase == "boolean" ? e.ignoreCase : e.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && Uf.has(e.name);
}
const Hf = {
  equals(e, t, r) {
    const { adapter: n } = r, { name: u } = t;
    let { value: i } = t;
    return wt(t, r) ? (i = i.toLowerCase(), (s) => {
      const c = n.getAttributeValue(s, u);
      return c != null && c.length === i.length && c.toLowerCase() === i && e(s);
    }) : (s) => n.getAttributeValue(s, u) === i && e(s);
  },
  hyphen(e, t, r) {
    const { adapter: n } = r, { name: u } = t;
    let { value: i } = t;
    const s = i.length;
    return wt(t, r) ? (i = i.toLowerCase(), function(l) {
      const h = n.getAttributeValue(l, u);
      return h != null && (h.length === s || h.charAt(s) === "-") && h.substr(0, s).toLowerCase() === i && e(l);
    }) : function(l) {
      const h = n.getAttributeValue(l, u);
      return h != null && (h.length === s || h.charAt(s) === "-") && h.substr(0, s) === i && e(l);
    };
  },
  element(e, t, r) {
    const { adapter: n } = r, { name: u, value: i } = t;
    if (/\s/.test(i))
      return ne.falseFunc;
    const s = new RegExp(`(?:^|\\s)${Ni(i)}(?:$|\\s)`, wt(t, r) ? "i" : "");
    return function(l) {
      const h = n.getAttributeValue(l, u);
      return h != null && h.length >= i.length && s.test(h) && e(l);
    };
  },
  exists(e, { name: t }, { adapter: r }) {
    return (n) => r.hasAttrib(n, t) && e(n);
  },
  start(e, t, r) {
    const { adapter: n } = r, { name: u } = t;
    let { value: i } = t;
    const s = i.length;
    return s === 0 ? ne.falseFunc : wt(t, r) ? (i = i.toLowerCase(), (c) => {
      const l = n.getAttributeValue(c, u);
      return l != null && l.length >= s && l.substr(0, s).toLowerCase() === i && e(c);
    }) : (c) => {
      var l;
      return !!(!((l = n.getAttributeValue(c, u)) === null || l === void 0) && l.startsWith(i)) && e(c);
    };
  },
  end(e, t, r) {
    const { adapter: n } = r, { name: u } = t;
    let { value: i } = t;
    const s = -i.length;
    return s === 0 ? ne.falseFunc : wt(t, r) ? (i = i.toLowerCase(), (c) => {
      var l;
      return ((l = n.getAttributeValue(c, u)) === null || l === void 0 ? void 0 : l.substr(s).toLowerCase()) === i && e(c);
    }) : (c) => {
      var l;
      return !!(!((l = n.getAttributeValue(c, u)) === null || l === void 0) && l.endsWith(i)) && e(c);
    };
  },
  any(e, t, r) {
    const { adapter: n } = r, { name: u, value: i } = t;
    if (i === "")
      return ne.falseFunc;
    if (wt(t, r)) {
      const s = new RegExp(Ni(i), "i");
      return function(l) {
        const h = n.getAttributeValue(l, u);
        return h != null && h.length >= i.length && s.test(h) && e(l);
      };
    }
    return (s) => {
      var c;
      return !!(!((c = n.getAttributeValue(s, u)) === null || c === void 0) && c.includes(i)) && e(s);
    };
  },
  not(e, t, r) {
    const { adapter: n } = r, { name: u } = t;
    let { value: i } = t;
    return i === "" ? (s) => !!n.getAttributeValue(s, u) && e(s) : wt(t, r) ? (i = i.toLowerCase(), (s) => {
      const c = n.getAttributeValue(s, u);
      return (c == null || c.length !== i.length || c.toLowerCase() !== i) && e(s);
    }) : (s) => n.getAttributeValue(s, u) !== i && e(s);
  }
}, Yf = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), Ii = "0".charCodeAt(0), $f = "9".charCodeAt(0);
function qf(e) {
  if (e = e.trim().toLowerCase(), e === "even")
    return [2, 0];
  if (e === "odd")
    return [2, 1];
  let t = 0, r = 0, n = i(), u = s();
  if (t < e.length && e.charAt(t) === "n" && (t++, r = n * (u ?? 1), c(), t < e.length ? (n = i(), c(), u = s()) : n = u = 0), u === null || t < e.length)
    throw new Error(`n-th rule couldn't be parsed ('${e}')`);
  return [r, n * u];
  function i() {
    return e.charAt(t) === "-" ? (t++, -1) : (e.charAt(t) === "+" && t++, 1);
  }
  function s() {
    const l = t;
    let h = 0;
    for (; t < e.length && e.charCodeAt(t) >= Ii && e.charCodeAt(t) <= $f; )
      h = h * 10 + (e.charCodeAt(t) - Ii), t++;
    return t === l ? null : h;
  }
  function c() {
    for (; t < e.length && Yf.has(e.charCodeAt(t)); )
      t++;
  }
}
function jf(e) {
  const t = e[0], r = e[1] - 1;
  if (r < 0 && t <= 0)
    return ne.falseFunc;
  if (t === -1)
    return (i) => i <= r;
  if (t === 0)
    return (i) => i === r;
  if (t === 1)
    return r < 0 ? ne.trueFunc : (i) => i >= r;
  const n = Math.abs(t), u = (r % n + n) % n;
  return t > 1 ? (i) => i >= r && i % n === u : (i) => i <= r && i % n === u;
}
function mn(e) {
  return jf(qf(e));
}
function Tn(e, t) {
  return (r) => {
    const n = t.getParent(r);
    return n != null && t.isTag(n) && e(r);
  };
}
const Ln = {
  contains(e, t, { adapter: r }) {
    return function(u) {
      return e(u) && r.getText(u).includes(t);
    };
  },
  icontains(e, t, { adapter: r }) {
    const n = t.toLowerCase();
    return function(i) {
      return e(i) && r.getText(i).toLowerCase().includes(n);
    };
  },
  // Location specific methods
  "nth-child"(e, t, { adapter: r, equals: n }) {
    const u = mn(t);
    return u === ne.falseFunc ? ne.falseFunc : u === ne.trueFunc ? Tn(e, r) : function(s) {
      const c = r.getSiblings(s);
      let l = 0;
      for (let h = 0; h < c.length && !n(s, c[h]); h++)
        r.isTag(c[h]) && l++;
      return u(l) && e(s);
    };
  },
  "nth-last-child"(e, t, { adapter: r, equals: n }) {
    const u = mn(t);
    return u === ne.falseFunc ? ne.falseFunc : u === ne.trueFunc ? Tn(e, r) : function(s) {
      const c = r.getSiblings(s);
      let l = 0;
      for (let h = c.length - 1; h >= 0 && !n(s, c[h]); h--)
        r.isTag(c[h]) && l++;
      return u(l) && e(s);
    };
  },
  "nth-of-type"(e, t, { adapter: r, equals: n }) {
    const u = mn(t);
    return u === ne.falseFunc ? ne.falseFunc : u === ne.trueFunc ? Tn(e, r) : function(s) {
      const c = r.getSiblings(s);
      let l = 0;
      for (let h = 0; h < c.length; h++) {
        const T = c[h];
        if (n(s, T))
          break;
        r.isTag(T) && r.getName(T) === r.getName(s) && l++;
      }
      return u(l) && e(s);
    };
  },
  "nth-last-of-type"(e, t, { adapter: r, equals: n }) {
    const u = mn(t);
    return u === ne.falseFunc ? ne.falseFunc : u === ne.trueFunc ? Tn(e, r) : function(s) {
      const c = r.getSiblings(s);
      let l = 0;
      for (let h = c.length - 1; h >= 0; h--) {
        const T = c[h];
        if (n(s, T))
          break;
        r.isTag(T) && r.getName(T) === r.getName(s) && l++;
      }
      return u(l) && e(s);
    };
  },
  // TODO determine the actual root element
  root(e, t, { adapter: r }) {
    return (n) => {
      const u = r.getParent(n);
      return (u == null || !r.isTag(u)) && e(n);
    };
  },
  scope(e, t, r, n) {
    const { equals: u } = r;
    return !n || n.length === 0 ? Ln.root(e, t, r) : n.length === 1 ? (i) => u(n[0], i) && e(i) : (i) => n.includes(i) && e(i);
  },
  hover: xu("isHovered"),
  visited: xu("isVisited"),
  active: xu("isActive")
};
function xu(e) {
  return function(r, n, { adapter: u }) {
    const i = u[e];
    return typeof i != "function" ? ne.falseFunc : function(c) {
      return i(c) && r(c);
    };
  };
}
const qu = {
  empty(e, { adapter: t }) {
    return !t.getChildren(e).some((r) => (
      // FIXME: `getText` call is potentially expensive.
      t.isTag(r) || t.getText(r) !== ""
    ));
  },
  "first-child"(e, { adapter: t, equals: r }) {
    if (t.prevElementSibling)
      return t.prevElementSibling(e) == null;
    const n = t.getSiblings(e).find((u) => t.isTag(u));
    return n != null && r(e, n);
  },
  "last-child"(e, { adapter: t, equals: r }) {
    const n = t.getSiblings(e);
    for (let u = n.length - 1; u >= 0; u--) {
      if (r(e, n[u]))
        return !0;
      if (t.isTag(n[u]))
        break;
    }
    return !1;
  },
  "first-of-type"(e, { adapter: t, equals: r }) {
    const n = t.getSiblings(e), u = t.getName(e);
    for (let i = 0; i < n.length; i++) {
      const s = n[i];
      if (r(e, s))
        return !0;
      if (t.isTag(s) && t.getName(s) === u)
        break;
    }
    return !1;
  },
  "last-of-type"(e, { adapter: t, equals: r }) {
    const n = t.getSiblings(e), u = t.getName(e);
    for (let i = n.length - 1; i >= 0; i--) {
      const s = n[i];
      if (r(e, s))
        return !0;
      if (t.isTag(s) && t.getName(s) === u)
        break;
    }
    return !1;
  },
  "only-of-type"(e, { adapter: t, equals: r }) {
    const n = t.getName(e);
    return t.getSiblings(e).every((u) => r(e, u) || !t.isTag(u) || t.getName(u) !== n);
  },
  "only-child"(e, { adapter: t, equals: r }) {
    return t.getSiblings(e).every((n) => r(e, n) || !t.isTag(n));
  }
};
function Si(e, t, r, n) {
  if (r === null) {
    if (e.length > n)
      throw new Error(`Pseudo-class :${t} requires an argument`);
  } else if (e.length === n)
    throw new Error(`Pseudo-class :${t} doesn't have any arguments`);
}
const Zs = {
  // Links
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  // Forms
  // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  // JQuery extensions
  // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
}, Js = {};
function Gf(e, t) {
  return e === ne.falseFunc ? ne.falseFunc : (r) => t.isTag(r) && e(r);
}
function eo(e, t) {
  const r = t.getSiblings(e);
  if (r.length <= 1)
    return [];
  const n = r.indexOf(e);
  return n < 0 || n === r.length - 1 ? [] : r.slice(n + 1).filter(t.isTag);
}
function ju(e) {
  return {
    xmlMode: !!e.xmlMode,
    lowerCaseAttributeNames: !!e.lowerCaseAttributeNames,
    lowerCaseTags: !!e.lowerCaseTags,
    quirksMode: !!e.quirksMode,
    cacheResults: !!e.cacheResults,
    pseudos: e.pseudos,
    adapter: e.adapter,
    equals: e.equals
  };
}
const Ru = (e, t, r, n, u) => {
  const i = u(t, ju(r), n);
  return i === ne.trueFunc ? e : i === ne.falseFunc ? ne.falseFunc : (s) => i(s) && e(s);
}, Lu = {
  is: Ru,
  /**
   * `:matches` and `:where` are aliases for `:is`.
   */
  matches: Ru,
  where: Ru,
  not(e, t, r, n, u) {
    const i = u(t, ju(r), n);
    return i === ne.falseFunc ? e : i === ne.trueFunc ? ne.falseFunc : (s) => !i(s) && e(s);
  },
  has(e, t, r, n, u) {
    const { adapter: i } = r, s = ju(r);
    s.relativeSelector = !0;
    const c = t.some((T) => T.some(ha)) ? (
      // Used as a placeholder. Will be replaced with the actual element.
      [Js]
    ) : void 0, l = u(t, s, c);
    if (l === ne.falseFunc)
      return ne.falseFunc;
    const h = Gf(l, i);
    if (c && l !== ne.trueFunc) {
      const { shouldTestNextSiblings: T = !1 } = l;
      return (_) => {
        if (!e(_))
          return !1;
        c[0] = _;
        const C = i.getChildren(_), p = T ? [...C, ...eo(_, i)] : C;
        return i.existsOne(h, p);
      };
    }
    return (T) => e(T) && i.existsOne(h, i.getChildren(T));
  }
};
function Wf(e, t, r, n, u) {
  var i;
  const { name: s, data: c } = t;
  if (Array.isArray(c)) {
    if (!(s in Lu))
      throw new Error(`Unknown pseudo-class :${s}(${c})`);
    return Lu[s](e, c, r, n, u);
  }
  const l = (i = r.pseudos) === null || i === void 0 ? void 0 : i[s], h = typeof l == "string" ? l : Zs[s];
  if (typeof h == "string") {
    if (c != null)
      throw new Error(`Pseudo ${s} doesn't have any arguments`);
    const T = Xn(h);
    return Lu.is(e, T, r, n, u);
  }
  if (typeof l == "function")
    return Si(l, s, c, 1), (T) => l(T, c) && e(T);
  if (s in Ln)
    return Ln[s](e, c, r, n);
  if (s in qu) {
    const T = qu[s];
    return Si(T, s, c, 2), (_) => T(_, r, c) && e(_);
  }
  throw new Error(`Unknown pseudo-class :${s}`);
}
function Du(e, t) {
  const r = t.getParent(e);
  return r && t.isTag(r) ? r : null;
}
function Qf(e, t, r, n, u) {
  const { adapter: i, equals: s } = r;
  switch (t.type) {
    case K.PseudoElement:
      throw new Error("Pseudo-elements are not supported by css-select");
    case K.ColumnCombinator:
      throw new Error("Column combinators are not yet supported by css-select");
    case K.Attribute: {
      if (t.namespace != null)
        throw new Error("Namespaced attributes are not yet supported by css-select");
      return (!r.xmlMode || r.lowerCaseAttributeNames) && (t.name = t.name.toLowerCase()), Hf[t.action](e, t, r);
    }
    case K.Pseudo:
      return Wf(e, t, r, n, u);
    case K.Tag: {
      if (t.namespace != null)
        throw new Error("Namespaced tag names are not yet supported by css-select");
      let { name: c } = t;
      return (!r.xmlMode || r.lowerCaseTags) && (c = c.toLowerCase()), function(h) {
        return i.getName(h) === c && e(h);
      };
    }
    case K.Descendant: {
      if (r.cacheResults === !1 || typeof WeakSet > "u")
        return function(h) {
          let T = h;
          for (; T = Du(T, i); )
            if (e(T))
              return !0;
          return !1;
        };
      const c = /* @__PURE__ */ new WeakSet();
      return function(h) {
        let T = h;
        for (; T = Du(T, i); )
          if (!c.has(T)) {
            if (i.isTag(T) && e(T))
              return !0;
            c.add(T);
          }
        return !1;
      };
    }
    case "_flexibleDescendant":
      return function(l) {
        let h = l;
        do
          if (e(h))
            return !0;
        while (h = Du(h, i));
        return !1;
      };
    case K.Parent:
      return function(l) {
        return i.getChildren(l).some((h) => i.isTag(h) && e(h));
      };
    case K.Child:
      return function(l) {
        const h = i.getParent(l);
        return h != null && i.isTag(h) && e(h);
      };
    case K.Sibling:
      return function(l) {
        const h = i.getSiblings(l);
        for (let T = 0; T < h.length; T++) {
          const _ = h[T];
          if (s(l, _))
            break;
          if (i.isTag(_) && e(_))
            return !0;
        }
        return !1;
      };
    case K.Adjacent:
      return i.prevElementSibling ? function(l) {
        const h = i.prevElementSibling(l);
        return h != null && e(h);
      } : function(l) {
        const h = i.getSiblings(l);
        let T;
        for (let _ = 0; _ < h.length; _++) {
          const C = h[_];
          if (s(l, C))
            break;
          i.isTag(C) && (T = C);
        }
        return !!T && e(T);
      };
    case K.Universal: {
      if (t.namespace != null && t.namespace !== "*")
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      return e;
    }
  }
}
function to(e) {
  return e.type === K.Pseudo && (e.name === "scope" || Array.isArray(e.data) && e.data.some((t) => t.some(to)));
}
const Vf = { type: K.Descendant }, Xf = {
  type: "_flexibleDescendant"
}, Kf = {
  type: K.Pseudo,
  name: "scope",
  data: null
};
function zf(e, { adapter: t }, r) {
  const n = !!(r != null && r.every((u) => {
    const i = t.isTag(u) && t.getParent(u);
    return u === Js || i && t.isTag(i);
  }));
  for (const u of e) {
    if (!(u.length > 0 && ha(u[0]) && u[0].type !== K.Descendant))
      if (n && !u.some(to))
        u.unshift(Vf);
      else
        continue;
    u.unshift(Kf);
  }
}
function ro(e, t, r) {
  var n;
  e.forEach(Bf), r = (n = t.context) !== null && n !== void 0 ? n : r;
  const u = Array.isArray(r), i = r && (Array.isArray(r) ? r : [r]);
  if (t.relativeSelector !== !1)
    zf(e, t, i);
  else if (e.some((l) => l.length > 0 && ha(l[0])))
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  let s = !1;
  const c = e.map((l) => {
    if (l.length >= 2) {
      const [h, T] = l;
      h.type !== K.Pseudo || h.name !== "scope" || (u && T.type === K.Descendant ? l[1] = Xf : (T.type === K.Adjacent || T.type === K.Sibling) && (s = !0));
    }
    return Zf(l, t, i);
  }).reduce(Jf, ne.falseFunc);
  return c.shouldTestNextSiblings = s, c;
}
function Zf(e, t, r) {
  var n;
  return e.reduce((u, i) => u === ne.falseFunc ? ne.falseFunc : Qf(u, i, t, r, ro), (n = t.rootFunc) !== null && n !== void 0 ? n : ne.trueFunc);
}
function Jf(e, t) {
  return t === ne.falseFunc || e === ne.trueFunc ? e : e === ne.falseFunc || t === ne.trueFunc ? t : function(n) {
    return e(n) || t(n);
  };
}
const no = (e, t) => e === t, ed = {
  adapter: pr,
  equals: no
};
function td(e) {
  var t, r, n, u;
  const i = e ?? ed;
  return (t = i.adapter) !== null && t !== void 0 || (i.adapter = pr), (r = i.equals) !== null && r !== void 0 || (i.equals = (u = (n = i.adapter) === null || n === void 0 ? void 0 : n.equals) !== null && u !== void 0 ? u : no), i;
}
function rd(e) {
  return function(r, n, u) {
    const i = td(n);
    return e(r, i, u);
  };
}
const Ea = rd(ro);
function uo(e, t, r = !1) {
  return r && (e = nd(e, t)), Array.isArray(e) ? t.removeSubsets(e) : t.getChildren(e);
}
function nd(e, t) {
  const r = Array.isArray(e) ? e.slice(0) : [e], n = r.length;
  for (let u = 0; u < n; u++) {
    const i = eo(r[u], t);
    r.push(...i);
  }
  return r;
}
const ud = /* @__PURE__ */ new Set([
  "first",
  "last",
  "eq",
  "gt",
  "nth",
  "lt",
  "even",
  "odd"
]);
function Dn(e) {
  return e.type !== "pseudo" ? !1 : ud.has(e.name) ? !0 : e.name === "not" && Array.isArray(e.data) ? e.data.some((t) => t.some(Dn)) : !1;
}
function ad(e, t, r) {
  const n = t != null ? parseInt(t, 10) : NaN;
  switch (e) {
    case "first":
      return 1;
    case "nth":
    case "eq":
      return isFinite(n) ? n >= 0 ? n + 1 : 1 / 0 : 0;
    case "lt":
      return isFinite(n) ? n >= 0 ? Math.min(n, r) : 1 / 0 : 0;
    case "gt":
      return isFinite(n) ? 1 / 0 : 0;
    case "odd":
      return 2 * r;
    case "even":
      return 2 * r - 1;
    case "last":
    case "not":
      return 1 / 0;
  }
}
function id(e) {
  for (; e.parent; )
    e = e.parent;
  return e;
}
function ma(e) {
  const t = [], r = [];
  for (const n of e)
    n.some(Dn) ? t.push(n) : r.push(n);
  return [r, t];
}
const sd = {
  type: K.Universal,
  namespace: null
}, od = {
  type: K.Pseudo,
  name: "scope",
  data: null
};
function Ta(e, t, r = {}) {
  return ba([e], t, r);
}
function ba(e, t, r = {}) {
  if (typeof t == "function")
    return e.some(t);
  const [n, u] = ma(Xn(t));
  return n.length > 0 && e.some(Ea(n, r)) || u.some((i) => io(i, e, r).length > 0);
}
function cd(e, t, r, n) {
  const u = typeof r == "string" ? parseInt(r, 10) : NaN;
  switch (e) {
    case "first":
    case "lt":
      return t;
    case "last":
      return t.length > 0 ? [t[t.length - 1]] : t;
    case "nth":
    case "eq":
      return isFinite(u) && Math.abs(u) < t.length ? [u < 0 ? t[t.length + u] : t[u]] : [];
    case "gt":
      return isFinite(u) ? t.slice(u + 1) : [];
    case "even":
      return t.filter((i, s) => s % 2 === 0);
    case "odd":
      return t.filter((i, s) => s % 2 === 1);
    case "not": {
      const i = new Set(ao(r, t, n));
      return t.filter((s) => !i.has(s));
    }
  }
}
function pa(e, t, r = {}) {
  return ao(Xn(e), t, r);
}
function ao(e, t, r) {
  if (t.length === 0)
    return [];
  const [n, u] = ma(e);
  let i;
  if (n.length) {
    const s = Wu(t, n, r);
    if (u.length === 0)
      return s;
    s.length && (i = new Set(s));
  }
  for (let s = 0; s < u.length && (i == null ? void 0 : i.size) !== t.length; s++) {
    const c = u[s];
    if ((i ? t.filter((T) => Z(T) && !i.has(T)) : t).length === 0)
      break;
    const h = io(c, t, r);
    if (h.length)
      if (i)
        h.forEach((T) => i.add(T));
      else {
        if (s === u.length - 1)
          return h;
        i = new Set(h);
      }
  }
  return typeof i < "u" ? i.size === t.length ? t : (
    // Filter elements to preserve order
    t.filter((s) => i.has(s))
  ) : [];
}
function io(e, t, r) {
  var n;
  if (e.some(Dr)) {
    const u = (n = r.root) !== null && n !== void 0 ? n : id(t[0]), i = { ...r, context: t, relativeSelector: !1 };
    return e.push(od), Pn(u, e, i, !0, t.length);
  }
  return Pn(t, e, r, !1, t.length);
}
function so(e, t, r = {}, n = 1 / 0) {
  if (typeof e == "function")
    return oo(t, e);
  const [u, i] = ma(Xn(e)), s = i.map((c) => Pn(t, c, r, !0, n));
  return u.length && s.push(Gu(t, u, r, n)), s.length === 0 ? [] : s.length === 1 ? s[0] : br(s.reduce((c, l) => [...c, ...l]));
}
function Pn(e, t, r, n, u) {
  const i = t.findIndex(Dn), s = t.slice(0, i), c = t[i], l = t.length - 1 === i ? u : 1 / 0, h = ad(c.name, c.data, l);
  if (h === 0)
    return [];
  const _ = (s.length === 0 && !Array.isArray(e) ? Wn(e).filter(Z) : s.length === 0 ? (Array.isArray(e) ? e : [e]).filter(Z) : n || s.some(Dr) ? Gu(e, [s], r, h) : Wu(e, [s], r)).slice(0, h);
  let C = cd(c.name, _, c.data, r);
  if (C.length === 0 || t.length === i + 1)
    return C;
  const p = t.slice(i + 1), g = p.some(Dr);
  if (g) {
    if (Dr(p[0])) {
      const { type: O } = p[0];
      (O === K.Sibling || O === K.Adjacent) && (C = uo(C, pr, !0)), p.unshift(sd);
    }
    r = {
      ...r,
      // Avoid absolutizing the selector
      relativeSelector: !1,
      /*
       * Add a custom root func, to make sure traversals don't match elements
       * that aren't a part of the considered tree.
       */
      rootFunc: (O) => C.includes(O)
    };
  } else
    r.rootFunc && r.rootFunc !== Rn.trueFunc && (r = { ...r, rootFunc: Rn.trueFunc });
  return p.some(Dn) ? Pn(C, p, r, !1, u) : g ? (
    // Query existing elements to resolve traversal.
    Gu(C, [p], r, u)
  ) : (
    // If we don't have any more traversals, simply filter elements.
    Wu(C, [p], r)
  );
}
function Gu(e, t, r, n) {
  const u = Ea(t, r, e);
  return oo(e, u, n);
}
function oo(e, t, r = 1 / 0) {
  const n = uo(e, pr, t.shouldTestNextSiblings);
  return ca((u) => Z(u) && t(u), n, !0, r);
}
function Wu(e, t, r) {
  const n = (Array.isArray(e) ? e : [e]).filter(Z);
  if (n.length === 0)
    return n;
  const u = Ea(t, r);
  return u === Rn.trueFunc ? n : n.filter(u);
}
const ld = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aliases: Zs,
  filter: pa,
  filters: Ln,
  is: Ta,
  pseudos: qu,
  select: so,
  some: ba
}, Symbol.toStringTag, { value: "Module" })), fd = /* @__PURE__ */ Gt(ld);
var dd = q && q.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var u = Object.getOwnPropertyDescriptor(t, r);
  (!u || ("get" in u ? !t.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, u);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), hd = q && q.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Ed = q && q.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && dd(t, e, r);
  return hd(t, e), t;
}, Qu = q && q.__spreadArray || function(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, u = t.length, i; n < u; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
};
Object.defineProperty($, "__esModule", { value: !0 });
$.addBack = $.add = $.end = $.slice = $.index = $.toArray = $.get = $.eq = $.last = $.first = $.has = $.not = $.is = $.filterArray = $.filter = $.map = $.each = $.contents = $.children = $.siblings = $.prevUntil = $.prevAll = $.prev = $.nextUntil = $.nextAll = $.next = $.closest = $.parentsUntil = $.parents = $.parent = $.find = void 0;
var Kn = cr, gr = Ed(fd), at = Qt, md = Ie, ft = Qr, Td = /^\s*[~+]/;
function bd(e) {
  var t;
  if (!e)
    return this._make([]);
  var r = this.toArray();
  if (typeof e != "string") {
    var n = (0, at.isCheerio)(e) ? e.toArray() : [e];
    return this._make(n.filter(function(s) {
      return r.some(function(c) {
        return (0, md.contains)(c, s);
      });
    }));
  }
  var u = Td.test(e) ? r : this.children().toArray(), i = {
    context: r,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0],
    // Pass options that are recognized by `cheerio-select`
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(gr.select(e, u, i));
}
$.find = bd;
function ga(e) {
  return function(t) {
    for (var r = [], n = 1; n < arguments.length; n++)
      r[n - 1] = arguments[n];
    return function(u) {
      var i, s = e(t, this);
      return u && (s = Ca(s, u, this.options.xmlMode, (i = this._root) === null || i === void 0 ? void 0 : i[0])), this._make(
        // Post processing is only necessary if there is more than one element.
        this.length > 1 && s.length > 1 ? r.reduce(function(c, l) {
          return l(c);
        }, s) : s
      );
    };
  };
}
var Vr = ga(function(e, t) {
  for (var r, n = [], u = 0; u < t.length; u++) {
    var i = e(t[u]);
    n.push(i);
  }
  return (r = new Array()).concat.apply(r, n);
}), _a = ga(function(e, t) {
  for (var r = [], n = 0; n < t.length; n++) {
    var u = e(t[n]);
    u !== null && r.push(u);
  }
  return r;
});
function Aa(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  var n = null, u = ga(function(i, s) {
    var c = [];
    return (0, at.domEach)(s, function(l) {
      for (var h; (h = i(l)) && !(n != null && n(h, c.length)); l = h)
        c.push(h);
    }), c;
  }).apply(void 0, Qu([e], t, !1));
  return function(i, s) {
    var c = this;
    n = typeof i == "string" ? function(h) {
      return gr.is(h, i, c.options);
    } : i ? Xr(i) : null;
    var l = u.call(this, s);
    return n = null, l;
  };
}
function _r(e) {
  return Array.from(new Set(e));
}
$.parent = _a(function(e) {
  var t = e.parent;
  return t && !(0, Kn.isDocument)(t) ? t : null;
}, _r);
$.parents = Vr(function(e) {
  for (var t = []; e.parent && !(0, Kn.isDocument)(e.parent); )
    t.push(e.parent), e = e.parent;
  return t;
}, ft.uniqueSort, function(e) {
  return e.reverse();
});
$.parentsUntil = Aa(function(e) {
  var t = e.parent;
  return t && !(0, Kn.isDocument)(t) ? t : null;
}, ft.uniqueSort, function(e) {
  return e.reverse();
});
function pd(e) {
  var t, r = [];
  if (!e)
    return this._make(r);
  var n = {
    xmlMode: this.options.xmlMode,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0]
  }, u = typeof e == "string" ? function(i) {
    return gr.is(i, e, n);
  } : Xr(e);
  return (0, at.domEach)(this, function(i) {
    for (; i && (0, at.isTag)(i); ) {
      if (u(i, 0)) {
        r.includes(i) || r.push(i);
        break;
      }
      i = i.parent;
    }
  }), this._make(r);
}
$.closest = pd;
$.next = _a(function(e) {
  return (0, ft.nextElementSibling)(e);
});
$.nextAll = Vr(function(e) {
  for (var t = []; e.next; )
    e = e.next, (0, at.isTag)(e) && t.push(e);
  return t;
}, _r);
$.nextUntil = Aa(function(e) {
  return (0, ft.nextElementSibling)(e);
}, _r);
$.prev = _a(function(e) {
  return (0, ft.prevElementSibling)(e);
});
$.prevAll = Vr(function(e) {
  for (var t = []; e.prev; )
    e = e.prev, (0, at.isTag)(e) && t.push(e);
  return t;
}, _r);
$.prevUntil = Aa(function(e) {
  return (0, ft.prevElementSibling)(e);
}, _r);
$.siblings = Vr(function(e) {
  return (0, ft.getSiblings)(e).filter(function(t) {
    return (0, at.isTag)(t) && t !== e;
  });
}, ft.uniqueSort);
$.children = Vr(function(e) {
  return (0, ft.getChildren)(e).filter(at.isTag);
}, _r);
function gd() {
  var e = this.toArray().reduce(function(t, r) {
    return (0, Kn.hasChildren)(r) ? t.concat(r.children) : t;
  }, []);
  return this._make(e);
}
$.contents = gd;
function _d(e) {
  for (var t = 0, r = this.length; t < r && e.call(this[t], t, this[t]) !== !1; )
    ++t;
  return this;
}
$.each = _d;
function Ad(e) {
  for (var t = [], r = 0; r < this.length; r++) {
    var n = this[r], u = e.call(n, r, n);
    u != null && (t = t.concat(u));
  }
  return this._make(t);
}
$.map = Ad;
function Xr(e) {
  return typeof e == "function" ? function(t, r) {
    return e.call(t, r, t);
  } : (0, at.isCheerio)(e) ? function(t) {
    return Array.prototype.includes.call(e, t);
  } : function(t) {
    return e === t;
  };
}
function Cd(e) {
  var t;
  return this._make(Ca(this.toArray(), e, this.options.xmlMode, (t = this._root) === null || t === void 0 ? void 0 : t[0]));
}
$.filter = Cd;
function Ca(e, t, r, n) {
  return typeof t == "string" ? gr.filter(t, e, { xmlMode: r, root: n }) : e.filter(Xr(t));
}
$.filterArray = Ca;
function Nd(e) {
  var t = this.toArray();
  return typeof e == "string" ? gr.some(t.filter(at.isTag), e, this.options) : e ? t.some(Xr(e)) : !1;
}
$.is = Nd;
function Id(e) {
  var t = this.toArray();
  if (typeof e == "string") {
    var r = new Set(gr.filter(e, t, this.options));
    t = t.filter(function(u) {
      return !r.has(u);
    });
  } else {
    var n = Xr(e);
    t = t.filter(function(u, i) {
      return !n(u, i);
    });
  }
  return this._make(t);
}
$.not = Id;
function Sd(e) {
  var t = this;
  return this.filter(typeof e == "string" ? (
    // Using the `:has` selector here short-circuits searches.
    ":has(".concat(e, ")")
  ) : function(r, n) {
    return t._make(n).find(e).length > 0;
  });
}
$.has = Sd;
function yd() {
  return this.length > 1 ? this._make(this[0]) : this;
}
$.first = yd;
function Od() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
$.last = Od;
function vd(e) {
  var t;
  return e = +e, e === 0 && this.length <= 1 ? this : (e < 0 && (e = this.length + e), this._make((t = this[e]) !== null && t !== void 0 ? t : []));
}
$.eq = vd;
function xd(e) {
  return e == null ? this.toArray() : this[e < 0 ? this.length + e : e];
}
$.get = xd;
function Rd() {
  return Array.prototype.slice.call(this);
}
$.toArray = Rd;
function Ld(e) {
  var t, r;
  return e == null ? (t = this.parent().children(), r = this[0]) : typeof e == "string" ? (t = this._make(e), r = this[0]) : (t = this, r = (0, at.isCheerio)(e) ? e[0] : e), Array.prototype.indexOf.call(t, r);
}
$.index = Ld;
function Dd(e, t) {
  return this._make(Array.prototype.slice.call(this, e, t));
}
$.slice = Dd;
function Pd() {
  var e;
  return (e = this.prevObject) !== null && e !== void 0 ? e : this._make([]);
}
$.end = Pd;
function Md(e, t) {
  var r = this._make(e, t), n = (0, ft.uniqueSort)(Qu(Qu([], this.get(), !0), r.get(), !0));
  return this._make(n);
}
$.add = Md;
function kd(e) {
  return this.prevObject ? this.add(e ? this.prevObject.filter(e) : this.prevObject) : this;
}
$.addBack = kd;
var te = {}, qt = {};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.update = qt.getParse = void 0;
var wd = Qr, yi = cr;
function Bd(e) {
  return function(r, n, u, i) {
    if (typeof Buffer < "u" && Buffer.isBuffer(r) && (r = r.toString()), typeof r == "string")
      return e(r, n, u, i);
    var s = r;
    if (!Array.isArray(s) && (0, yi.isDocument)(s))
      return s;
    var c = new yi.Document([]);
    return co(s, c), c;
  };
}
qt.getParse = Bd;
function co(e, t) {
  var r = Array.isArray(e) ? e : [e];
  t ? t.children = r : t = null;
  for (var n = 0; n < r.length; n++) {
    var u = r[n];
    u.parent && u.parent.children !== r && (0, wd.removeElement)(u), t ? (u.prev = r[n - 1] || null, u.next = r[n + 1] || null) : u.prev = u.next = null, u.parent = t;
  }
  return t;
}
qt.update = co;
var Fd = q && q.__spreadArray || function(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, u = t.length, i; n < u; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
};
Object.defineProperty(te, "__esModule", { value: !0 });
te.clone = te.text = te.toString = te.html = te.empty = te.replaceWith = te.remove = te.insertBefore = te.before = te.insertAfter = te.after = te.wrapAll = te.unwrap = te.wrapInner = te.wrap = te.prepend = te.append = te.prependTo = te.appendTo = te._makeDomArray = void 0;
var dt = cr, lr = qt, Oi = Ie, Re = Qt, Ud = Qr;
function Hd(e, t) {
  var r = this;
  return e == null ? [] : (0, Re.isCheerio)(e) ? t ? (0, Re.cloneDom)(e.get()) : e.get() : Array.isArray(e) ? e.reduce(function(n, u) {
    return n.concat(r._makeDomArray(u, t));
  }, []) : typeof e == "string" ? this._parse(e, this.options, !1, null).children : t ? (0, Re.cloneDom)([e]) : [e];
}
te._makeDomArray = Hd;
function lo(e) {
  return function() {
    for (var t = this, r = [], n = 0; n < arguments.length; n++)
      r[n] = arguments[n];
    var u = this.length - 1;
    return (0, Re.domEach)(this, function(i, s) {
      if ((0, dt.hasChildren)(i)) {
        var c = typeof r[0] == "function" ? r[0].call(i, s, t._render(i.children)) : r, l = t._makeDomArray(c, s < u);
        e(l, i.children, i);
      }
    });
  };
}
function Lt(e, t, r, n, u) {
  for (var i, s, c = Fd([
    t,
    r
  ], n, !0), l = t === 0 ? null : e[t - 1], h = t + r >= e.length ? null : e[t + r], T = 0; T < n.length; ++T) {
    var _ = n[T], C = _.parent;
    if (C) {
      var p = C.children, g = p.indexOf(_);
      g > -1 && (C.children.splice(g, 1), u === C && t > g && c[0]--);
    }
    _.parent = u, _.prev && (_.prev.next = (i = _.next) !== null && i !== void 0 ? i : null), _.next && (_.next.prev = (s = _.prev) !== null && s !== void 0 ? s : null), _.prev = T === 0 ? l : n[T - 1], _.next = T === n.length - 1 ? h : n[T + 1];
  }
  return l && (l.next = n[0]), h && (h.prev = n[n.length - 1]), e.splice.apply(e, c);
}
function Yd(e) {
  var t = (0, Re.isCheerio)(e) ? e : this._make(e);
  return t.append(this), this;
}
te.appendTo = Yd;
function $d(e) {
  var t = (0, Re.isCheerio)(e) ? e : this._make(e);
  return t.prepend(this), this;
}
te.prependTo = $d;
te.append = lo(function(e, t, r) {
  Lt(t, t.length, 0, e, r);
});
te.prepend = lo(function(e, t, r) {
  Lt(t, 0, 0, e, r);
});
function fo(e) {
  return function(t) {
    for (var r = this.length - 1, n = this.parents().last(), u = 0; u < this.length; u++) {
      var i = this[u], s = typeof t == "function" ? t.call(i, u, i) : typeof t == "string" && !(0, Re.isHtml)(t) ? n.find(t).clone() : t, c = this._makeDomArray(s, u < r)[0];
      if (!(!c || !(0, dt.hasChildren)(c))) {
        for (var l = c, h = 0; h < l.children.length; ) {
          var T = l.children[h];
          (0, Re.isTag)(T) ? (l = T, h = 0) : h++;
        }
        e(i, l, [c]);
      }
    }
    return this;
  };
}
te.wrap = fo(function(e, t, r) {
  var n = e.parent;
  if (n) {
    var u = n.children, i = u.indexOf(e);
    (0, lr.update)([e], t), Lt(u, i, 0, r, n);
  }
});
te.wrapInner = fo(function(e, t, r) {
  (0, dt.hasChildren)(e) && ((0, lr.update)(e.children, t), (0, lr.update)(r, e));
});
function qd(e) {
  var t = this;
  return this.parent(e).not("body").each(function(r, n) {
    t._make(n).replaceWith(n.children);
  }), this;
}
te.unwrap = qd;
function jd(e) {
  var t = this[0];
  if (t) {
    for (var r = this._make(typeof e == "function" ? e.call(t, 0, t) : e).insertBefore(t), n = void 0, u = 0; u < r.length; u++)
      r[u].type === "tag" && (n = r[u]);
    for (var i = 0; n && i < n.children.length; ) {
      var s = n.children[i];
      s.type === "tag" ? (n = s, i = 0) : i++;
    }
    n && this._make(n).append(this);
  }
  return this;
}
te.wrapAll = jd;
function Gd() {
  for (var e = this, t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  var n = this.length - 1;
  return (0, Re.domEach)(this, function(u, i) {
    var s = u.parent;
    if (!(!(0, dt.hasChildren)(u) || !s)) {
      var c = s.children, l = c.indexOf(u);
      if (!(l < 0)) {
        var h = typeof t[0] == "function" ? t[0].call(u, i, e._render(u.children)) : t, T = e._makeDomArray(h, i < n);
        Lt(c, l + 1, 0, T, s);
      }
    }
  });
}
te.after = Gd;
function Wd(e) {
  var t = this;
  typeof e == "string" && (e = this._make(e)), this.remove();
  var r = [];
  return this._makeDomArray(e).forEach(function(n) {
    var u = t.clone().toArray(), i = n.parent;
    if (i) {
      var s = i.children, c = s.indexOf(n);
      c < 0 || (Lt(s, c + 1, 0, u, i), r.push.apply(r, u));
    }
  }), this._make(r);
}
te.insertAfter = Wd;
function Qd() {
  for (var e = this, t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  var n = this.length - 1;
  return (0, Re.domEach)(this, function(u, i) {
    var s = u.parent;
    if (!(!(0, dt.hasChildren)(u) || !s)) {
      var c = s.children, l = c.indexOf(u);
      if (!(l < 0)) {
        var h = typeof t[0] == "function" ? t[0].call(u, i, e._render(u.children)) : t, T = e._makeDomArray(h, i < n);
        Lt(c, l, 0, T, s);
      }
    }
  });
}
te.before = Qd;
function Vd(e) {
  var t = this, r = this._make(e);
  this.remove();
  var n = [];
  return (0, Re.domEach)(r, function(u) {
    var i = t.clone().toArray(), s = u.parent;
    if (s) {
      var c = s.children, l = c.indexOf(u);
      l < 0 || (Lt(c, l, 0, i, s), n.push.apply(n, i));
    }
  }), this._make(n);
}
te.insertBefore = Vd;
function Xd(e) {
  var t = e ? this.filter(e) : this;
  return (0, Re.domEach)(t, function(r) {
    (0, Ud.removeElement)(r), r.prev = r.next = r.parent = null;
  }), this;
}
te.remove = Xd;
function Kd(e) {
  var t = this;
  return (0, Re.domEach)(this, function(r, n) {
    var u = r.parent;
    if (u) {
      var i = u.children, s = typeof e == "function" ? e.call(r, n, r) : e, c = t._makeDomArray(s);
      (0, lr.update)(c, null);
      var l = i.indexOf(r);
      Lt(i, l, 1, c, u), c.includes(r) || (r.parent = r.prev = r.next = null);
    }
  });
}
te.replaceWith = Kd;
function zd() {
  return (0, Re.domEach)(this, function(e) {
    (0, dt.hasChildren)(e) && (e.children.forEach(function(t) {
      t.next = t.prev = t.parent = null;
    }), e.children.length = 0);
  });
}
te.empty = zd;
function Zd(e) {
  var t = this;
  if (e === void 0) {
    var r = this[0];
    return !r || !(0, dt.hasChildren)(r) ? null : this._render(r.children);
  }
  return (0, Re.domEach)(this, function(n) {
    if ((0, dt.hasChildren)(n)) {
      n.children.forEach(function(i) {
        i.next = i.prev = i.parent = null;
      });
      var u = (0, Re.isCheerio)(e) ? e.toArray() : t._parse("".concat(e), t.options, !1, n).children;
      (0, lr.update)(u, n);
    }
  });
}
te.html = Zd;
function Jd() {
  return this._render(this);
}
te.toString = Jd;
function eh(e) {
  var t = this;
  return e === void 0 ? (0, Oi.text)(this) : typeof e == "function" ? (0, Re.domEach)(this, function(r, n) {
    return t._make(r).text(e.call(r, n, (0, Oi.text)([r])));
  }) : (0, Re.domEach)(this, function(r) {
    if ((0, dt.hasChildren)(r)) {
      r.children.forEach(function(u) {
        u.next = u.prev = u.parent = null;
      });
      var n = new dt.Text("".concat(e));
      (0, lr.update)(n, r);
    }
  });
}
te.text = eh;
function th() {
  return this._make((0, Re.cloneDom)(this.get()));
}
te.clone = th;
var zn = {};
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.css = void 0;
var Vu = Qt;
function rh(e, t) {
  if (e != null && t != null || // When `prop` is a "plain" object
  typeof e == "object" && !Array.isArray(e))
    return (0, Vu.domEach)(this, function(r, n) {
      (0, Vu.isTag)(r) && ho(r, e, t, n);
    });
  if (this.length !== 0)
    return Eo(this[0], e);
}
zn.css = rh;
function ho(e, t, r, n) {
  if (typeof t == "string") {
    var u = Eo(e), i = typeof r == "function" ? r.call(e, n, u[t]) : r;
    i === "" ? delete u[t] : i != null && (u[t] = i), e.attribs.style = nh(u);
  } else
    typeof t == "object" && Object.keys(t).forEach(function(s, c) {
      ho(e, s, t[s], c);
    });
}
function Eo(e, t) {
  if (!(!e || !(0, Vu.isTag)(e))) {
    var r = uh(e.attribs.style);
    if (typeof t == "string")
      return r[t];
    if (Array.isArray(t)) {
      var n = {};
      return t.forEach(function(u) {
        r[u] != null && (n[u] = r[u]);
      }), n;
    }
    return r;
  }
}
function nh(e) {
  return Object.keys(e).reduce(function(t, r) {
    return "".concat(t).concat(t ? " " : "").concat(r, ": ").concat(e[r], ";");
  }, "");
}
function uh(e) {
  if (e = (e || "").trim(), !e)
    return {};
  for (var t = {}, r, n = 0, u = e.split(";"); n < u.length; n++) {
    var i = u[n], s = i.indexOf(":");
    if (s < 1 || s === i.length - 1) {
      var c = i.trimEnd();
      c.length > 0 && r !== void 0 && (t[r] += ";".concat(c));
    } else
      r = i.slice(0, s).trim(), t[r] = i.slice(s + 1).trim();
  }
  return t;
}
var fr = {};
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.serializeArray = fr.serialize = void 0;
var ah = Qt, vi = "input,select,textarea,keygen", ih = /%20/g, xi = /\r?\n/g;
function sh() {
  var e = this.serializeArray(), t = e.map(function(r) {
    return "".concat(encodeURIComponent(r.name), "=").concat(encodeURIComponent(r.value));
  });
  return t.join("&").replace(ih, "+");
}
fr.serialize = sh;
function oh() {
  var e = this;
  return this.map(function(t, r) {
    var n = e._make(r);
    return (0, ah.isTag)(r) && r.name === "form" ? n.find(vi).toArray() : n.filter(vi).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    // Convert each of the elements to its value(s)
  ).map(function(t, r) {
    var n, u = e._make(r), i = u.attr("name"), s = (n = u.val()) !== null && n !== void 0 ? n : "";
    return Array.isArray(s) ? s.map(function(c) {
      return { name: i, value: c.replace(xi, `\r
`) };
    }) : { name: i, value: s.replace(xi, `\r
`) };
  }).toArray();
}
fr.serializeArray = oh;
var ch = q && q.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var u = Object.getOwnPropertyDescriptor(t, r);
  (!u || ("get" in u ? !t.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, u);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), lh = q && q.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Kr = q && q.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && ch(t, e, r);
  return lh(t, e), t;
};
Object.defineProperty(Vn, "__esModule", { value: !0 });
Vn.Cheerio = void 0;
var fh = Kr(ye), dh = Kr($), hh = Kr(te), Eh = Kr(zn), mh = Kr(fr), zr = (
  /** @class */
  function() {
    function e(t, r, n) {
      if (this.length = 0, this.options = n, this._root = r, t) {
        for (var u = 0; u < t.length; u++)
          this[u] = t[u];
        this.length = t.length;
      }
    }
    return e;
  }()
);
Vn.Cheerio = zr;
zr.prototype.cheerio = "[cheerio object]";
zr.prototype.splice = Array.prototype.splice;
zr.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(zr.prototype, fh, dh, hh, Eh, mh);
var Th = q && q.__extends || function() {
  var e = function(t, r) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, u) {
      n.__proto__ = u;
    } || function(n, u) {
      for (var i in u)
        Object.prototype.hasOwnProperty.call(u, i) && (n[i] = u[i]);
    }, e(t, r);
  };
  return function(t, r) {
    if (typeof r != "function" && r !== null)
      throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
    e(t, r);
    function n() {
      this.constructor = t;
    }
    t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n());
  };
}(), er = q && q.__assign || function() {
  return er = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var u in t)
        Object.prototype.hasOwnProperty.call(t, u) && (e[u] = t[u]);
    }
    return e;
  }, er.apply(this, arguments);
}, bh = q && q.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var u = Object.getOwnPropertyDescriptor(t, r);
  (!u || ("get" in u ? !t.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, u);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), ph = q && q.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), mo = q && q.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && bh(t, e, r);
  return ph(t, e), t;
};
Object.defineProperty(Hn, "__esModule", { value: !0 });
Hn.getLoad = void 0;
var Pu = mo(mr), gh = mo(Ie), _h = Vn, Or = Qt;
function Ah(e, t) {
  return function r(n, u, i) {
    if (i === void 0 && (i = !0), n == null)
      throw new Error("cheerio.load() expects a string");
    var s = er(er({}, Pu.default), (0, Pu.flatten)(u)), c = e(n, s, i, null), l = (
      /** @class */
      function(T) {
        Th(_, T);
        function _() {
          return T !== null && T.apply(this, arguments) || this;
        }
        return _.prototype._make = function(C, p) {
          var g = h(C, p);
          return g.prevObject = this, g;
        }, _.prototype._parse = function(C, p, g, O) {
          return e(C, p, g, O);
        }, _.prototype._render = function(C) {
          return t(C, this.options);
        }, _;
      }(_h.Cheerio)
    );
    function h(T, _, C, p) {
      if (C === void 0 && (C = c), T && (0, Or.isCheerio)(T))
        return T;
      var g = er(er({}, s), (0, Pu.flatten)(p)), O = typeof C == "string" ? [e(C, g, !1, null)] : "length" in C ? C : [C], M = (0, Or.isCheerio)(O) ? O : new l(O, null, g);
      if (M._root = M, !T)
        return new l(void 0, M, g);
      var Y = typeof T == "string" && (0, Or.isHtml)(T) ? (
        // $(<html>)
        e(T, g, !1, null).children
      ) : Ch(T) ? (
        // $(dom)
        [T]
      ) : Array.isArray(T) ? (
        // $([dom])
        T
      ) : void 0, W = new l(Y, M, g);
      if (Y)
        return W;
      if (typeof T != "string")
        throw new Error("Unexpected type of selector");
      var Q = T, k = _ ? typeof _ == "string" ? (0, Or.isHtml)(_) ? (
        // $('li', '<ul>...</ul>')
        new l([e(_, g, !1, null)], M, g)
      ) : (
        // $('li', 'ul')
        (Q = "".concat(_, " ").concat(Q), M)
      ) : (0, Or.isCheerio)(_) ? (
        // $('li', $)
        _
      ) : (
        // $('li', node), $('li', [nodes])
        new l(Array.isArray(_) ? _ : [_], M, g)
      ) : (
        // If we don't have a context, maybe we have a root, from loading
        M
      );
      return k ? k.find(Q) : W;
    }
    return Object.assign(h, gh, {
      load: r,
      // `_root` and `_options` are used in static methods.
      _root: c,
      _options: s,
      // Add `fn` for plugins
      fn: l.prototype,
      // Add the prototype here to maintain `instanceof` behavior.
      prototype: l.prototype
    }), h;
  };
}
Hn.getLoad = Ah;
function Ch(e) {
  return !!e.name || e.type === "root" || e.type === "text" || e.type === "comment";
}
var dr = {};
const Nh = /* @__PURE__ */ new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]), _e = "�";
var f;
(function(e) {
  e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.NUMBER_SIGN = 35] = "NUMBER_SIGN", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_F = 70] = "LATIN_CAPITAL_F", e[e.LATIN_CAPITAL_X = 88] = "LATIN_CAPITAL_X", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_F = 102] = "LATIN_SMALL_F", e[e.LATIN_SMALL_X = 120] = "LATIN_SMALL_X", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z", e[e.REPLACEMENT_CHARACTER = 65533] = "REPLACEMENT_CHARACTER";
})(f = f || (f = {}));
const Qe = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function To(e) {
  return e >= 55296 && e <= 57343;
}
function Ih(e) {
  return e >= 56320 && e <= 57343;
}
function Sh(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function bo(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function po(e) {
  return e >= 64976 && e <= 65007 || Nh.has(e);
}
var A;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(A = A || (A = {}));
const yh = 65536;
class Oh {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = yh, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(t) {
    const { line: r, col: n, offset: u } = this;
    return {
      code: t,
      startLine: r,
      endLine: r,
      startCol: n,
      endCol: n,
      startOffset: u,
      endOffset: u
    };
  }
  _err(t) {
    this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(t)));
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
  }
  _processSurrogate(t) {
    if (this.pos !== this.html.length - 1) {
      const r = this.html.charCodeAt(this.pos + 1);
      if (Ih(r))
        return this.pos++, this._addGap(), Sh(t, r);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, f.EOF;
    return this._err(A.surrogateInInputStream), t;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(t, r) {
    this.html.length > 0 ? this.html += t : this.html = t, this.endOfChunkHit = !1, this.lastChunkWritten = r;
  }
  insertHtmlAtCurrentPos(t) {
    this.html = this.html.substring(0, this.pos + 1) + t + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(t, r) {
    if (this.pos + t.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (r)
      return this.html.startsWith(t, this.pos);
    for (let n = 0; n < t.length; n++)
      if ((this.html.charCodeAt(this.pos + n) | 32) !== t.charCodeAt(n))
        return !1;
    return !0;
  }
  peek(t) {
    const r = this.pos + t;
    if (r >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, f.EOF;
    const n = this.html.charCodeAt(r);
    return n === f.CARRIAGE_RETURN ? f.LINE_FEED : n;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, f.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === f.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, f.LINE_FEED) : t === f.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, To(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === f.LINE_FEED || t === f.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    bo(t) ? this._err(A.controlCharacterInInputStream) : po(t) && this._err(A.noncharacterInInputStream);
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
var ie;
(function(e) {
  e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(ie = ie || (ie = {}));
function Na(e, t) {
  for (let r = e.attrs.length - 1; r >= 0; r--)
    if (e.attrs[r].name === t)
      return e.attrs[r].value;
  return null;
}
const vh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get TokenType() {
    return ie;
  },
  getTokenAttr: Na
}, Symbol.toStringTag, { value: "Module" }));
var I;
(function(e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(I = I || (I = {}));
var _t;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(_t = _t || (_t = {}));
var $e;
(function(e) {
  e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})($e = $e || ($e = {}));
var b;
(function(e) {
  e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(b = b || (b = {}));
var a;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SECTION = 94] = "SECTION", e[e.SELECT = 95] = "SELECT", e[e.SOURCE = 96] = "SOURCE", e[e.SMALL = 97] = "SMALL", e[e.SPAN = 98] = "SPAN", e[e.STRIKE = 99] = "STRIKE", e[e.STRONG = 100] = "STRONG", e[e.STYLE = 101] = "STYLE", e[e.SUB = 102] = "SUB", e[e.SUMMARY = 103] = "SUMMARY", e[e.SUP = 104] = "SUP", e[e.TABLE = 105] = "TABLE", e[e.TBODY = 106] = "TBODY", e[e.TEMPLATE = 107] = "TEMPLATE", e[e.TEXTAREA = 108] = "TEXTAREA", e[e.TFOOT = 109] = "TFOOT", e[e.TD = 110] = "TD", e[e.TH = 111] = "TH", e[e.THEAD = 112] = "THEAD", e[e.TITLE = 113] = "TITLE", e[e.TR = 114] = "TR", e[e.TRACK = 115] = "TRACK", e[e.TT = 116] = "TT", e[e.U = 117] = "U", e[e.UL = 118] = "UL", e[e.SVG = 119] = "SVG", e[e.VAR = 120] = "VAR", e[e.WBR = 121] = "WBR", e[e.XMP = 122] = "XMP";
})(a = a || (a = {}));
const xh = /* @__PURE__ */ new Map([
  [b.A, a.A],
  [b.ADDRESS, a.ADDRESS],
  [b.ANNOTATION_XML, a.ANNOTATION_XML],
  [b.APPLET, a.APPLET],
  [b.AREA, a.AREA],
  [b.ARTICLE, a.ARTICLE],
  [b.ASIDE, a.ASIDE],
  [b.B, a.B],
  [b.BASE, a.BASE],
  [b.BASEFONT, a.BASEFONT],
  [b.BGSOUND, a.BGSOUND],
  [b.BIG, a.BIG],
  [b.BLOCKQUOTE, a.BLOCKQUOTE],
  [b.BODY, a.BODY],
  [b.BR, a.BR],
  [b.BUTTON, a.BUTTON],
  [b.CAPTION, a.CAPTION],
  [b.CENTER, a.CENTER],
  [b.CODE, a.CODE],
  [b.COL, a.COL],
  [b.COLGROUP, a.COLGROUP],
  [b.DD, a.DD],
  [b.DESC, a.DESC],
  [b.DETAILS, a.DETAILS],
  [b.DIALOG, a.DIALOG],
  [b.DIR, a.DIR],
  [b.DIV, a.DIV],
  [b.DL, a.DL],
  [b.DT, a.DT],
  [b.EM, a.EM],
  [b.EMBED, a.EMBED],
  [b.FIELDSET, a.FIELDSET],
  [b.FIGCAPTION, a.FIGCAPTION],
  [b.FIGURE, a.FIGURE],
  [b.FONT, a.FONT],
  [b.FOOTER, a.FOOTER],
  [b.FOREIGN_OBJECT, a.FOREIGN_OBJECT],
  [b.FORM, a.FORM],
  [b.FRAME, a.FRAME],
  [b.FRAMESET, a.FRAMESET],
  [b.H1, a.H1],
  [b.H2, a.H2],
  [b.H3, a.H3],
  [b.H4, a.H4],
  [b.H5, a.H5],
  [b.H6, a.H6],
  [b.HEAD, a.HEAD],
  [b.HEADER, a.HEADER],
  [b.HGROUP, a.HGROUP],
  [b.HR, a.HR],
  [b.HTML, a.HTML],
  [b.I, a.I],
  [b.IMG, a.IMG],
  [b.IMAGE, a.IMAGE],
  [b.INPUT, a.INPUT],
  [b.IFRAME, a.IFRAME],
  [b.KEYGEN, a.KEYGEN],
  [b.LABEL, a.LABEL],
  [b.LI, a.LI],
  [b.LINK, a.LINK],
  [b.LISTING, a.LISTING],
  [b.MAIN, a.MAIN],
  [b.MALIGNMARK, a.MALIGNMARK],
  [b.MARQUEE, a.MARQUEE],
  [b.MATH, a.MATH],
  [b.MENU, a.MENU],
  [b.META, a.META],
  [b.MGLYPH, a.MGLYPH],
  [b.MI, a.MI],
  [b.MO, a.MO],
  [b.MN, a.MN],
  [b.MS, a.MS],
  [b.MTEXT, a.MTEXT],
  [b.NAV, a.NAV],
  [b.NOBR, a.NOBR],
  [b.NOFRAMES, a.NOFRAMES],
  [b.NOEMBED, a.NOEMBED],
  [b.NOSCRIPT, a.NOSCRIPT],
  [b.OBJECT, a.OBJECT],
  [b.OL, a.OL],
  [b.OPTGROUP, a.OPTGROUP],
  [b.OPTION, a.OPTION],
  [b.P, a.P],
  [b.PARAM, a.PARAM],
  [b.PLAINTEXT, a.PLAINTEXT],
  [b.PRE, a.PRE],
  [b.RB, a.RB],
  [b.RP, a.RP],
  [b.RT, a.RT],
  [b.RTC, a.RTC],
  [b.RUBY, a.RUBY],
  [b.S, a.S],
  [b.SCRIPT, a.SCRIPT],
  [b.SECTION, a.SECTION],
  [b.SELECT, a.SELECT],
  [b.SOURCE, a.SOURCE],
  [b.SMALL, a.SMALL],
  [b.SPAN, a.SPAN],
  [b.STRIKE, a.STRIKE],
  [b.STRONG, a.STRONG],
  [b.STYLE, a.STYLE],
  [b.SUB, a.SUB],
  [b.SUMMARY, a.SUMMARY],
  [b.SUP, a.SUP],
  [b.TABLE, a.TABLE],
  [b.TBODY, a.TBODY],
  [b.TEMPLATE, a.TEMPLATE],
  [b.TEXTAREA, a.TEXTAREA],
  [b.TFOOT, a.TFOOT],
  [b.TD, a.TD],
  [b.TH, a.TH],
  [b.THEAD, a.THEAD],
  [b.TITLE, a.TITLE],
  [b.TR, a.TR],
  [b.TRACK, a.TRACK],
  [b.TT, a.TT],
  [b.U, a.U],
  [b.UL, a.UL],
  [b.SVG, a.SVG],
  [b.VAR, a.VAR],
  [b.WBR, a.WBR],
  [b.XMP, a.XMP]
]);
function Zr(e) {
  var t;
  return (t = xh.get(e)) !== null && t !== void 0 ? t : a.UNKNOWN;
}
const L = a, go = {
  [I.HTML]: /* @__PURE__ */ new Set([
    L.ADDRESS,
    L.APPLET,
    L.AREA,
    L.ARTICLE,
    L.ASIDE,
    L.BASE,
    L.BASEFONT,
    L.BGSOUND,
    L.BLOCKQUOTE,
    L.BODY,
    L.BR,
    L.BUTTON,
    L.CAPTION,
    L.CENTER,
    L.COL,
    L.COLGROUP,
    L.DD,
    L.DETAILS,
    L.DIR,
    L.DIV,
    L.DL,
    L.DT,
    L.EMBED,
    L.FIELDSET,
    L.FIGCAPTION,
    L.FIGURE,
    L.FOOTER,
    L.FORM,
    L.FRAME,
    L.FRAMESET,
    L.H1,
    L.H2,
    L.H3,
    L.H4,
    L.H5,
    L.H6,
    L.HEAD,
    L.HEADER,
    L.HGROUP,
    L.HR,
    L.HTML,
    L.IFRAME,
    L.IMG,
    L.INPUT,
    L.LI,
    L.LINK,
    L.LISTING,
    L.MAIN,
    L.MARQUEE,
    L.MENU,
    L.META,
    L.NAV,
    L.NOEMBED,
    L.NOFRAMES,
    L.NOSCRIPT,
    L.OBJECT,
    L.OL,
    L.P,
    L.PARAM,
    L.PLAINTEXT,
    L.PRE,
    L.SCRIPT,
    L.SECTION,
    L.SELECT,
    L.SOURCE,
    L.STYLE,
    L.SUMMARY,
    L.TABLE,
    L.TBODY,
    L.TD,
    L.TEMPLATE,
    L.TEXTAREA,
    L.TFOOT,
    L.TH,
    L.THEAD,
    L.TITLE,
    L.TR,
    L.TRACK,
    L.UL,
    L.WBR,
    L.XMP
  ]),
  [I.MATHML]: /* @__PURE__ */ new Set([L.MI, L.MO, L.MN, L.MS, L.MTEXT, L.ANNOTATION_XML]),
  [I.SVG]: /* @__PURE__ */ new Set([L.TITLE, L.FOREIGN_OBJECT, L.DESC]),
  [I.XLINK]: /* @__PURE__ */ new Set(),
  [I.XML]: /* @__PURE__ */ new Set(),
  [I.XMLNS]: /* @__PURE__ */ new Set()
};
function Ia(e) {
  return e === L.H1 || e === L.H2 || e === L.H3 || e === L.H4 || e === L.H5 || e === L.H6;
}
const Rh = /* @__PURE__ */ new Set([
  b.STYLE,
  b.SCRIPT,
  b.XMP,
  b.IFRAME,
  b.NOEMBED,
  b.NOFRAMES,
  b.PLAINTEXT
]);
function _o(e, t) {
  return Rh.has(e) || t && e === b.NOSCRIPT;
}
const Lh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ATTRS() {
    return _t;
  },
  get DOCUMENT_MODE() {
    return $e;
  },
  get NS() {
    return I;
  },
  SPECIAL_ELEMENTS: go,
  get TAG_ID() {
    return a;
  },
  get TAG_NAMES() {
    return b;
  },
  getTagID: Zr,
  hasUnescapedText: _o,
  isNumberedHeader: Ia
}, Symbol.toStringTag, { value: "Module" })), Dh = /* @__PURE__ */ new Map([
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var d;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.NAMED_CHARACTER_REFERENCE = 72] = "NAMED_CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 73] = "AMBIGUOUS_AMPERSAND", e[e.NUMERIC_CHARACTER_REFERENCE = 74] = "NUMERIC_CHARACTER_REFERENCE", e[e.HEXADEMICAL_CHARACTER_REFERENCE_START = 75] = "HEXADEMICAL_CHARACTER_REFERENCE_START", e[e.HEXADEMICAL_CHARACTER_REFERENCE = 76] = "HEXADEMICAL_CHARACTER_REFERENCE", e[e.DECIMAL_CHARACTER_REFERENCE = 77] = "DECIMAL_CHARACTER_REFERENCE", e[e.NUMERIC_CHARACTER_REFERENCE_END = 78] = "NUMERIC_CHARACTER_REFERENCE_END";
})(d || (d = {}));
const qe = {
  DATA: d.DATA,
  RCDATA: d.RCDATA,
  RAWTEXT: d.RAWTEXT,
  SCRIPT_DATA: d.SCRIPT_DATA,
  PLAINTEXT: d.PLAINTEXT,
  CDATA_SECTION: d.CDATA_SECTION
};
function Pr(e) {
  return e >= f.DIGIT_0 && e <= f.DIGIT_9;
}
function Rr(e) {
  return e >= f.LATIN_CAPITAL_A && e <= f.LATIN_CAPITAL_Z;
}
function Ph(e) {
  return e >= f.LATIN_SMALL_A && e <= f.LATIN_SMALL_Z;
}
function St(e) {
  return Ph(e) || Rr(e);
}
function Xu(e) {
  return St(e) || Pr(e);
}
function Ao(e) {
  return e >= f.LATIN_CAPITAL_A && e <= f.LATIN_CAPITAL_F;
}
function Co(e) {
  return e >= f.LATIN_SMALL_A && e <= f.LATIN_SMALL_F;
}
function Mh(e) {
  return Pr(e) || Ao(e) || Co(e);
}
function bn(e) {
  return e + 32;
}
function No(e) {
  return e === f.SPACE || e === f.LINE_FEED || e === f.TABULATION || e === f.FORM_FEED;
}
function kh(e) {
  return e === f.EQUALS_SIGN || Xu(e);
}
function Ri(e) {
  return No(e) || e === f.SOLIDUS || e === f.GREATER_THAN_SIGN;
}
let Io = class {
  constructor(t, r) {
    this.options = t, this.handler = r, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = d.DATA, this.returnState = d.DATA, this.charRefCode = -1, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Oh(r), this.currentLocation = this.getCurrentLocation(-1);
  }
  //Errors
  _err(t) {
    var r, n;
    (n = (r = this.handler).onParseError) === null || n === void 0 || n.call(r, this.preprocessor.getError(t));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(t) {
    return this.options.sourceCodeLocationInfo ? {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - t,
      startOffset: this.preprocessor.offset - t,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    } : null;
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused; ) {
        this.consumedAfterSnapshot = 0;
        const t = this._consume();
        this._ensureHibernation() || this._callState(t);
      }
      this.inLoop = !1;
    }
  }
  //API
  pause() {
    this.paused = !0;
  }
  resume(t) {
    if (!this.paused)
      throw new Error("Parser was already resumed");
    this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || t == null || t());
  }
  write(t, r, n) {
    this.active = !0, this.preprocessor.write(t, r), this._runParsingLoop(), this.paused || n == null || n();
  }
  insertHtmlAtCurrentPos(t) {
    this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(t), this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit ? (this._unconsume(this.consumedAfterSnapshot), this.active = !1, !0) : !1;
  }
  //Consumption
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance();
  }
  _unconsume(t) {
    this.consumedAfterSnapshot -= t, this.preprocessor.retreat(t);
  }
  _reconsumeInState(t, r) {
    this.state = t, this._callState(r);
  }
  _advanceBy(t) {
    this.consumedAfterSnapshot += t;
    for (let r = 0; r < t; r++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(t, r) {
    return this.preprocessor.startsWith(t, r) ? (this._advanceBy(t.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: ie.START_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: ie.END_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(t) {
    this.currentToken = {
      type: ie.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    };
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: ie.DOCTYPE,
      name: t,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(t, r) {
    this.currentCharacterToken = {
      type: t,
      chars: r,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(t) {
    this.currentAttr = {
      name: t,
      value: ""
    }, this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var t, r;
    const n = this.currentToken;
    if (Na(n, this.currentAttr.name) === null) {
      if (n.attrs.push(this.currentAttr), n.location && this.currentLocation) {
        const u = (t = (r = n.location).attrs) !== null && t !== void 0 ? t : r.attrs = /* @__PURE__ */ Object.create(null);
        u[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(A.duplicateAttribute);
  }
  _leaveAttrValue() {
    this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
  }
  //Token emission
  prepareToken(t) {
    this._emitCurrentCharacterToken(t.location), this.currentToken = null, t.location && (t.location.endLine = this.preprocessor.line, t.location.endCol = this.preprocessor.col + 1, t.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const t = this.currentToken;
    this.prepareToken(t), t.tagID = Zr(t.tagName), t.type === ie.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(A.endTagWithAttributes), t.selfClosing && this._err(A.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(t) {
    this.prepareToken(t), this.handler.onComment(t), this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(t) {
    this.prepareToken(t), this.handler.onDoctype(t), this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(t) {
    if (this.currentCharacterToken) {
      switch (t && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = t.startLine, this.currentCharacterToken.location.endCol = t.startCol, this.currentCharacterToken.location.endOffset = t.startOffset), this.currentCharacterToken.type) {
        case ie.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case ie.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case ie.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: ie.EOF, location: t }), this.active = !1;
  }
  //Characters emission
  //OPTIMIZATION: specification uses only one type of character tokens (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(t, r) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type !== t)
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
      else {
        this.currentCharacterToken.chars += r;
        return;
      }
    this._createCharacterToken(t, r);
  }
  _emitCodePoint(t) {
    const r = No(t) ? ie.WHITESPACE_CHARACTER : t === f.NULL ? ie.NULL_CHARACTER : ie.CHARACTER;
    this._appendCharToCurrentCharacterToken(r, String.fromCodePoint(t));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(ie.CHARACTER, t);
  }
  // Character reference helpers
  _matchNamedCharacterReference(t) {
    let r = null, n = 0, u = !1;
    for (let i = 0, s = gt[0]; i >= 0 && (i = ia(gt, s, i + 1, t), !(i < 0)); t = this._consume()) {
      n += 1, s = gt[i];
      const c = s & ze.VALUE_LENGTH;
      if (c) {
        const l = (c >> 14) - 1;
        if (t !== f.SEMICOLON && this._isCharacterReferenceInAttribute() && kh(this.preprocessor.peek(1)) ? (r = [f.AMPERSAND], i += l) : (r = l === 0 ? [gt[i] & ~ze.VALUE_LENGTH] : l === 1 ? [gt[++i]] : [gt[++i], gt[++i]], n = 0, u = t !== f.SEMICOLON), l === 0) {
          this._consume();
          break;
        }
      }
    }
    return this._unconsume(n), u && !this.preprocessor.endOfChunkHit && this._err(A.missingSemicolonAfterCharacterReference), this._unconsume(1), r;
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === d.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === d.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === d.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(t) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(t) : this._emitCodePoint(t);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(t) {
    switch (this.state) {
      case d.DATA: {
        this._stateData(t);
        break;
      }
      case d.RCDATA: {
        this._stateRcdata(t);
        break;
      }
      case d.RAWTEXT: {
        this._stateRawtext(t);
        break;
      }
      case d.SCRIPT_DATA: {
        this._stateScriptData(t);
        break;
      }
      case d.PLAINTEXT: {
        this._statePlaintext(t);
        break;
      }
      case d.TAG_OPEN: {
        this._stateTagOpen(t);
        break;
      }
      case d.END_TAG_OPEN: {
        this._stateEndTagOpen(t);
        break;
      }
      case d.TAG_NAME: {
        this._stateTagName(t);
        break;
      }
      case d.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(t);
        break;
      }
      case d.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(t);
        break;
      }
      case d.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(t);
        break;
      }
      case d.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(t);
        break;
      }
      case d.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(t);
        break;
      }
      case d.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(t);
        break;
      }
      case d.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(t);
        break;
      }
      case d.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(t);
        break;
      }
      case d.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(t);
        break;
      }
      case d.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(t);
        break;
      }
      case d.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(t);
        break;
      }
      case d.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(t);
        break;
      }
      case d.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(t);
        break;
      }
      case d.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(t);
        break;
      }
      case d.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(t);
        break;
      }
      case d.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(t);
        break;
      }
      case d.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(t);
        break;
      }
      case d.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(t);
        break;
      }
      case d.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(t);
        break;
      }
      case d.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(t);
        break;
      }
      case d.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(t);
        break;
      }
      case d.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(t);
        break;
      }
      case d.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(t);
        break;
      }
      case d.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(t);
        break;
      }
      case d.ATTRIBUTE_NAME: {
        this._stateAttributeName(t);
        break;
      }
      case d.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(t);
        break;
      }
      case d.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(t);
        break;
      }
      case d.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(t);
        break;
      }
      case d.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(t);
        break;
      }
      case d.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(t);
        break;
      }
      case d.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(t);
        break;
      }
      case d.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(t);
        break;
      }
      case d.BOGUS_COMMENT: {
        this._stateBogusComment(t);
        break;
      }
      case d.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(t);
        break;
      }
      case d.COMMENT_START: {
        this._stateCommentStart(t);
        break;
      }
      case d.COMMENT_START_DASH: {
        this._stateCommentStartDash(t);
        break;
      }
      case d.COMMENT: {
        this._stateComment(t);
        break;
      }
      case d.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(t);
        break;
      }
      case d.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(t);
        break;
      }
      case d.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(t);
        break;
      }
      case d.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(t);
        break;
      }
      case d.COMMENT_END_DASH: {
        this._stateCommentEndDash(t);
        break;
      }
      case d.COMMENT_END: {
        this._stateCommentEnd(t);
        break;
      }
      case d.COMMENT_END_BANG: {
        this._stateCommentEndBang(t);
        break;
      }
      case d.DOCTYPE: {
        this._stateDoctype(t);
        break;
      }
      case d.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(t);
        break;
      }
      case d.DOCTYPE_NAME: {
        this._stateDoctypeName(t);
        break;
      }
      case d.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(t);
        break;
      }
      case d.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(t);
        break;
      }
      case d.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(t);
        break;
      }
      case d.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(t);
        break;
      }
      case d.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(t);
        break;
      }
      case d.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(t);
        break;
      }
      case d.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
        break;
      }
      case d.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(t);
        break;
      }
      case d.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(t);
        break;
      }
      case d.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(t);
        break;
      }
      case d.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(t);
        break;
      }
      case d.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(t);
        break;
      }
      case d.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(t);
        break;
      }
      case d.CDATA_SECTION: {
        this._stateCdataSection(t);
        break;
      }
      case d.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(t);
        break;
      }
      case d.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(t);
        break;
      }
      case d.CHARACTER_REFERENCE: {
        this._stateCharacterReference(t);
        break;
      }
      case d.NAMED_CHARACTER_REFERENCE: {
        this._stateNamedCharacterReference(t);
        break;
      }
      case d.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(t);
        break;
      }
      case d.NUMERIC_CHARACTER_REFERENCE: {
        this._stateNumericCharacterReference(t);
        break;
      }
      case d.HEXADEMICAL_CHARACTER_REFERENCE_START: {
        this._stateHexademicalCharacterReferenceStart(t);
        break;
      }
      case d.HEXADEMICAL_CHARACTER_REFERENCE: {
        this._stateHexademicalCharacterReference(t);
        break;
      }
      case d.DECIMAL_CHARACTER_REFERENCE: {
        this._stateDecimalCharacterReference(t);
        break;
      }
      case d.NUMERIC_CHARACTER_REFERENCE_END: {
        this._stateNumericCharacterReferenceEnd(t);
        break;
      }
      default:
        throw new Error("Unknown state");
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(t) {
    switch (t) {
      case f.LESS_THAN_SIGN: {
        this.state = d.TAG_OPEN;
        break;
      }
      case f.AMPERSAND: {
        this.returnState = d.DATA, this.state = d.CHARACTER_REFERENCE;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this._emitCodePoint(t);
        break;
      }
      case f.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(t) {
    switch (t) {
      case f.AMPERSAND: {
        this.returnState = d.RCDATA, this.state = d.CHARACTER_REFERENCE;
        break;
      }
      case f.LESS_THAN_SIGN: {
        this.state = d.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(t) {
    switch (t) {
      case f.LESS_THAN_SIGN: {
        this.state = d.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(t) {
    switch (t) {
      case f.LESS_THAN_SIGN: {
        this.state = d.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(t) {
    switch (t) {
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(t) {
    if (St(t))
      this._createStartTagToken(), this.state = d.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case f.EXCLAMATION_MARK: {
          this.state = d.MARKUP_DECLARATION_OPEN;
          break;
        }
        case f.SOLIDUS: {
          this.state = d.END_TAG_OPEN;
          break;
        }
        case f.QUESTION_MARK: {
          this._err(A.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = d.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case f.EOF: {
          this._err(A.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(A.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = d.DATA, this._stateData(t);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(t) {
    if (St(t))
      this._createEndTagToken(), this.state = d.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case f.GREATER_THAN_SIGN: {
          this._err(A.missingEndTagName), this.state = d.DATA;
          break;
        }
        case f.EOF: {
          this._err(A.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(A.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = d.BOGUS_COMMENT, this._stateBogusComment(t);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED: {
        this.state = d.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case f.SOLIDUS: {
        this.state = d.SELF_CLOSING_START_TAG;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this.state = d.DATA, this.emitCurrentTagToken();
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), r.tagName += _e;
        break;
      }
      case f.EOF: {
        this._err(A.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        r.tagName += String.fromCodePoint(Rr(t) ? bn(t) : t);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(t) {
    t === f.SOLIDUS ? this.state = d.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = d.RCDATA, this._stateRcdata(t));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(t) {
    St(t) ? (this.state = d.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = d.RCDATA, this._stateRcdata(t));
  }
  handleSpecialEndTag(t) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const r = this.currentToken;
    switch (r.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = d.BEFORE_ATTRIBUTE_NAME, !1;
      case f.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = d.SELF_CLOSING_START_TAG, !1;
      case f.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = d.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = d.RCDATA, this._stateRcdata(t));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(t) {
    t === f.SOLIDUS ? this.state = d.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = d.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(t) {
    St(t) ? (this.state = d.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = d.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = d.RAWTEXT, this._stateRawtext(t));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(t) {
    switch (t) {
      case f.SOLIDUS: {
        this.state = d.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case f.EXCLAMATION_MARK: {
        this.state = d.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = d.SCRIPT_DATA, this._stateScriptData(t);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(t) {
    St(t) ? (this.state = d.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = d.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = d.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(t) {
    t === f.HYPHEN_MINUS ? (this.state = d.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = d.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(t) {
    t === f.HYPHEN_MINUS ? (this.state = d.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = d.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(t) {
    switch (t) {
      case f.HYPHEN_MINUS: {
        this.state = d.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case f.LESS_THAN_SIGN: {
        this.state = d.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._err(A.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(t) {
    switch (t) {
      case f.HYPHEN_MINUS: {
        this.state = d.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case f.LESS_THAN_SIGN: {
        this.state = d.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this.state = d.SCRIPT_DATA_ESCAPED, this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._err(A.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = d.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(t) {
    switch (t) {
      case f.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case f.LESS_THAN_SIGN: {
        this.state = d.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this.state = d.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this.state = d.SCRIPT_DATA_ESCAPED, this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._err(A.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = d.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(t) {
    t === f.SOLIDUS ? this.state = d.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : St(t) ? (this._emitChars("<"), this.state = d.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = d.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    St(t) ? (this.state = d.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = d.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = d.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(Qe.SCRIPT, !1) && Ri(this.preprocessor.peek(Qe.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < Qe.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = d.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(t) {
    switch (t) {
      case f.HYPHEN_MINUS: {
        this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case f.LESS_THAN_SIGN: {
        this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._err(A.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(t) {
    switch (t) {
      case f.HYPHEN_MINUS: {
        this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case f.LESS_THAN_SIGN: {
        this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._err(A.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(t) {
    switch (t) {
      case f.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case f.LESS_THAN_SIGN: {
        this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this.state = d.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(_e);
        break;
      }
      case f.EOF: {
        this._err(A.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(t) {
    t === f.SOLIDUS ? (this.state = d.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(t) {
    if (this.preprocessor.startsWith(Qe.SCRIPT, !1) && Ri(this.preprocessor.peek(Qe.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < Qe.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = d.SCRIPT_DATA_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = d.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(t) {
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
        break;
      case f.SOLIDUS:
      case f.GREATER_THAN_SIGN:
      case f.EOF: {
        this.state = d.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case f.EQUALS_SIGN: {
        this._err(A.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = d.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = d.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(t) {
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
      case f.SOLIDUS:
      case f.GREATER_THAN_SIGN:
      case f.EOF: {
        this._leaveAttrName(), this.state = d.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case f.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = d.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case f.QUOTATION_MARK:
      case f.APOSTROPHE:
      case f.LESS_THAN_SIGN: {
        this._err(A.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this.currentAttr.name += _e;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(Rr(t) ? bn(t) : t);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(t) {
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
        break;
      case f.SOLIDUS: {
        this.state = d.SELF_CLOSING_START_TAG;
        break;
      }
      case f.EQUALS_SIGN: {
        this.state = d.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this.state = d.DATA, this.emitCurrentTagToken();
        break;
      }
      case f.EOF: {
        this._err(A.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = d.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(t) {
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
        break;
      case f.QUOTATION_MARK: {
        this.state = d.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case f.APOSTROPHE: {
        this.state = d.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.missingAttributeValue), this.state = d.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = d.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(t);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(t) {
    switch (t) {
      case f.QUOTATION_MARK: {
        this.state = d.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case f.AMPERSAND: {
        this.returnState = d.ATTRIBUTE_VALUE_DOUBLE_QUOTED, this.state = d.CHARACTER_REFERENCE;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this.currentAttr.value += _e;
        break;
      }
      case f.EOF: {
        this._err(A.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(t) {
    switch (t) {
      case f.APOSTROPHE: {
        this.state = d.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case f.AMPERSAND: {
        this.returnState = d.ATTRIBUTE_VALUE_SINGLE_QUOTED, this.state = d.CHARACTER_REFERENCE;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this.currentAttr.value += _e;
        break;
      }
      case f.EOF: {
        this._err(A.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(t) {
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED: {
        this._leaveAttrValue(), this.state = d.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case f.AMPERSAND: {
        this.returnState = d.ATTRIBUTE_VALUE_UNQUOTED, this.state = d.CHARACTER_REFERENCE;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = d.DATA, this.emitCurrentTagToken();
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), this.currentAttr.value += _e;
        break;
      }
      case f.QUOTATION_MARK:
      case f.APOSTROPHE:
      case f.LESS_THAN_SIGN:
      case f.EQUALS_SIGN:
      case f.GRAVE_ACCENT: {
        this._err(A.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
        break;
      }
      case f.EOF: {
        this._err(A.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(t) {
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED: {
        this._leaveAttrValue(), this.state = d.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case f.SOLIDUS: {
        this._leaveAttrValue(), this.state = d.SELF_CLOSING_START_TAG;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = d.DATA, this.emitCurrentTagToken();
        break;
      }
      case f.EOF: {
        this._err(A.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.missingWhitespaceBetweenAttributes), this.state = d.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(t) {
    switch (t) {
      case f.GREATER_THAN_SIGN: {
        const r = this.currentToken;
        r.selfClosing = !0, this.state = d.DATA, this.emitCurrentTagToken();
        break;
      }
      case f.EOF: {
        this._err(A.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.unexpectedSolidusInTag), this.state = d.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(t) {
    const r = this.currentToken;
    switch (t) {
      case f.GREATER_THAN_SIGN: {
        this.state = d.DATA, this.emitCurrentComment(r);
        break;
      }
      case f.EOF: {
        this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), r.data += _e;
        break;
      }
      default:
        r.data += String.fromCodePoint(t);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(Qe.DASH_DASH, !0) ? (this._createCommentToken(Qe.DASH_DASH.length + 1), this.state = d.COMMENT_START) : this._consumeSequenceIfMatch(Qe.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(Qe.DOCTYPE.length + 1), this.state = d.DOCTYPE) : this._consumeSequenceIfMatch(Qe.CDATA_START, !0) ? this.inForeignNode ? this.state = d.CDATA_SECTION : (this._err(A.cdataInHtmlContent), this._createCommentToken(Qe.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = d.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(A.incorrectlyOpenedComment), this._createCommentToken(2), this.state = d.BOGUS_COMMENT, this._stateBogusComment(t));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(t) {
    switch (t) {
      case f.HYPHEN_MINUS: {
        this.state = d.COMMENT_START_DASH;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.abruptClosingOfEmptyComment), this.state = d.DATA;
        const r = this.currentToken;
        this.emitCurrentComment(r);
        break;
      }
      default:
        this.state = d.COMMENT, this._stateComment(t);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(t) {
    const r = this.currentToken;
    switch (t) {
      case f.HYPHEN_MINUS: {
        this.state = d.COMMENT_END;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.abruptClosingOfEmptyComment), this.state = d.DATA, this.emitCurrentComment(r);
        break;
      }
      case f.EOF: {
        this._err(A.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "-", this.state = d.COMMENT, this._stateComment(t);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(t) {
    const r = this.currentToken;
    switch (t) {
      case f.HYPHEN_MINUS: {
        this.state = d.COMMENT_END_DASH;
        break;
      }
      case f.LESS_THAN_SIGN: {
        r.data += "<", this.state = d.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), r.data += _e;
        break;
      }
      case f.EOF: {
        this._err(A.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += String.fromCodePoint(t);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(t) {
    const r = this.currentToken;
    switch (t) {
      case f.EXCLAMATION_MARK: {
        r.data += "!", this.state = d.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case f.LESS_THAN_SIGN: {
        r.data += "<";
        break;
      }
      default:
        this.state = d.COMMENT, this._stateComment(t);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(t) {
    t === f.HYPHEN_MINUS ? this.state = d.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = d.COMMENT, this._stateComment(t));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(t) {
    t === f.HYPHEN_MINUS ? this.state = d.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = d.COMMENT_END_DASH, this._stateCommentEndDash(t));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(t) {
    t !== f.GREATER_THAN_SIGN && t !== f.EOF && this._err(A.nestedComment), this.state = d.COMMENT_END, this._stateCommentEnd(t);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(t) {
    const r = this.currentToken;
    switch (t) {
      case f.HYPHEN_MINUS: {
        this.state = d.COMMENT_END;
        break;
      }
      case f.EOF: {
        this._err(A.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "-", this.state = d.COMMENT, this._stateComment(t);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(t) {
    const r = this.currentToken;
    switch (t) {
      case f.GREATER_THAN_SIGN: {
        this.state = d.DATA, this.emitCurrentComment(r);
        break;
      }
      case f.EXCLAMATION_MARK: {
        this.state = d.COMMENT_END_BANG;
        break;
      }
      case f.HYPHEN_MINUS: {
        r.data += "-";
        break;
      }
      case f.EOF: {
        this._err(A.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "--", this.state = d.COMMENT, this._stateComment(t);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(t) {
    const r = this.currentToken;
    switch (t) {
      case f.HYPHEN_MINUS: {
        r.data += "--!", this.state = d.COMMENT_END_DASH;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.incorrectlyClosedComment), this.state = d.DATA, this.emitCurrentComment(r);
        break;
      }
      case f.EOF: {
        this._err(A.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "--!", this.state = d.COMMENT, this._stateComment(t);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(t) {
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED: {
        this.state = d.BEFORE_DOCTYPE_NAME;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this.state = d.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), this._createDoctypeToken(null);
        const r = this.currentToken;
        r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.missingWhitespaceBeforeDoctypeName), this.state = d.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(t) {
    if (Rr(t))
      this._createDoctypeToken(String.fromCharCode(bn(t))), this.state = d.DOCTYPE_NAME;
    else
      switch (t) {
        case f.SPACE:
        case f.LINE_FEED:
        case f.TABULATION:
        case f.FORM_FEED:
          break;
        case f.NULL: {
          this._err(A.unexpectedNullCharacter), this._createDoctypeToken(_e), this.state = d.DOCTYPE_NAME;
          break;
        }
        case f.GREATER_THAN_SIGN: {
          this._err(A.missingDoctypeName), this._createDoctypeToken(null);
          const r = this.currentToken;
          r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = d.DATA;
          break;
        }
        case f.EOF: {
          this._err(A.eofInDoctype), this._createDoctypeToken(null);
          const r = this.currentToken;
          r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(t)), this.state = d.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED: {
        this.state = d.AFTER_DOCTYPE_NAME;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this.state = d.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), r.name += _e;
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.name += String.fromCodePoint(Rr(t) ? bn(t) : t);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
        break;
      case f.GREATER_THAN_SIGN: {
        this.state = d.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(Qe.PUBLIC, !1) ? this.state = d.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(Qe.SYSTEM, !1) ? this.state = d.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(A.invalidCharacterSequenceAfterDoctypeName), r.forceQuirks = !0, this.state = d.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED: {
        this.state = d.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case f.QUOTATION_MARK: {
        this._err(A.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = d.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case f.APOSTROPHE: {
        this._err(A.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = d.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = d.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = d.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
        break;
      case f.QUOTATION_MARK: {
        r.publicId = "", this.state = d.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case f.APOSTROPHE: {
        r.publicId = "", this.state = d.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = d.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = d.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case f.QUOTATION_MARK: {
        this.state = d.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), r.publicId += _e;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = d.DATA;
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.publicId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case f.APOSTROPHE: {
        this.state = d.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), r.publicId += _e;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = d.DATA;
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.publicId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED: {
        this.state = d.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this.state = d.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case f.QUOTATION_MARK: {
        this._err(A.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = d.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case f.APOSTROPHE: {
        this._err(A.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = d.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = d.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
        break;
      case f.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = d.DATA;
        break;
      }
      case f.QUOTATION_MARK: {
        r.systemId = "", this.state = d.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case f.APOSTROPHE: {
        r.systemId = "", this.state = d.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = d.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED: {
        this.state = d.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case f.QUOTATION_MARK: {
        this._err(A.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = d.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case f.APOSTROPHE: {
        this._err(A.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = d.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = d.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = d.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
        break;
      case f.QUOTATION_MARK: {
        r.systemId = "", this.state = d.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case f.APOSTROPHE: {
        r.systemId = "", this.state = d.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = d.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = d.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case f.QUOTATION_MARK: {
        this.state = d.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), r.systemId += _e;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = d.DATA;
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.systemId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case f.APOSTROPHE: {
        this.state = d.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter), r.systemId += _e;
        break;
      }
      case f.GREATER_THAN_SIGN: {
        this._err(A.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = d.DATA;
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.systemId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case f.SPACE:
      case f.LINE_FEED:
      case f.TABULATION:
      case f.FORM_FEED:
        break;
      case f.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = d.DATA;
        break;
      }
      case f.EOF: {
        this._err(A.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(A.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = d.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(t) {
    const r = this.currentToken;
    switch (t) {
      case f.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = d.DATA;
        break;
      }
      case f.NULL: {
        this._err(A.unexpectedNullCharacter);
        break;
      }
      case f.EOF: {
        this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(t) {
    switch (t) {
      case f.RIGHT_SQUARE_BRACKET: {
        this.state = d.CDATA_SECTION_BRACKET;
        break;
      }
      case f.EOF: {
        this._err(A.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(t) {
    t === f.RIGHT_SQUARE_BRACKET ? this.state = d.CDATA_SECTION_END : (this._emitChars("]"), this.state = d.CDATA_SECTION, this._stateCdataSection(t));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(t) {
    switch (t) {
      case f.GREATER_THAN_SIGN: {
        this.state = d.DATA;
        break;
      }
      case f.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = d.CDATA_SECTION, this._stateCdataSection(t);
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference(t) {
    t === f.NUMBER_SIGN ? this.state = d.NUMERIC_CHARACTER_REFERENCE : Xu(t) ? (this.state = d.NAMED_CHARACTER_REFERENCE, this._stateNamedCharacterReference(t)) : (this._flushCodePointConsumedAsCharacterReference(f.AMPERSAND), this._reconsumeInState(this.returnState, t));
  }
  // Named character reference state
  //------------------------------------------------------------------
  _stateNamedCharacterReference(t) {
    const r = this._matchNamedCharacterReference(t);
    if (!this._ensureHibernation())
      if (r) {
        for (let n = 0; n < r.length; n++)
          this._flushCodePointConsumedAsCharacterReference(r[n]);
        this.state = this.returnState;
      } else
        this._flushCodePointConsumedAsCharacterReference(f.AMPERSAND), this.state = d.AMBIGUOUS_AMPERSAND;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    Xu(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === f.SEMICOLON && this._err(A.unknownNamedCharacterReference), this._reconsumeInState(this.returnState, t));
  }
  // Numeric character reference state
  //------------------------------------------------------------------
  _stateNumericCharacterReference(t) {
    this.charRefCode = 0, t === f.LATIN_SMALL_X || t === f.LATIN_CAPITAL_X ? this.state = d.HEXADEMICAL_CHARACTER_REFERENCE_START : Pr(t) ? (this.state = d.DECIMAL_CHARACTER_REFERENCE, this._stateDecimalCharacterReference(t)) : (this._err(A.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(f.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(f.NUMBER_SIGN), this._reconsumeInState(this.returnState, t));
  }
  // Hexademical character reference start state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReferenceStart(t) {
    Mh(t) ? (this.state = d.HEXADEMICAL_CHARACTER_REFERENCE, this._stateHexademicalCharacterReference(t)) : (this._err(A.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(f.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(f.NUMBER_SIGN), this._unconsume(2), this.state = this.returnState);
  }
  // Hexademical character reference state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReference(t) {
    Ao(t) ? this.charRefCode = this.charRefCode * 16 + t - 55 : Co(t) ? this.charRefCode = this.charRefCode * 16 + t - 87 : Pr(t) ? this.charRefCode = this.charRefCode * 16 + t - 48 : t === f.SEMICOLON ? this.state = d.NUMERIC_CHARACTER_REFERENCE_END : (this._err(A.missingSemicolonAfterCharacterReference), this.state = d.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(t));
  }
  // Decimal character reference state
  //------------------------------------------------------------------
  _stateDecimalCharacterReference(t) {
    Pr(t) ? this.charRefCode = this.charRefCode * 10 + t - 48 : t === f.SEMICOLON ? this.state = d.NUMERIC_CHARACTER_REFERENCE_END : (this._err(A.missingSemicolonAfterCharacterReference), this.state = d.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(t));
  }
  // Numeric character reference end state
  //------------------------------------------------------------------
  _stateNumericCharacterReferenceEnd(t) {
    if (this.charRefCode === f.NULL)
      this._err(A.nullCharacterReference), this.charRefCode = f.REPLACEMENT_CHARACTER;
    else if (this.charRefCode > 1114111)
      this._err(A.characterReferenceOutsideUnicodeRange), this.charRefCode = f.REPLACEMENT_CHARACTER;
    else if (To(this.charRefCode))
      this._err(A.surrogateCharacterReference), this.charRefCode = f.REPLACEMENT_CHARACTER;
    else if (po(this.charRefCode))
      this._err(A.noncharacterCharacterReference);
    else if (bo(this.charRefCode) || this.charRefCode === f.CARRIAGE_RETURN) {
      this._err(A.controlCharacterReference);
      const r = Dh.get(this.charRefCode);
      r !== void 0 && (this.charRefCode = r);
    }
    this._flushCodePointConsumedAsCharacterReference(this.charRefCode), this._reconsumeInState(this.returnState, t);
  }
};
const So = /* @__PURE__ */ new Set([a.DD, a.DT, a.LI, a.OPTGROUP, a.OPTION, a.P, a.RB, a.RP, a.RT, a.RTC]), Li = /* @__PURE__ */ new Set([
  ...So,
  a.CAPTION,
  a.COLGROUP,
  a.TBODY,
  a.TD,
  a.TFOOT,
  a.TH,
  a.THEAD,
  a.TR
]), pn = /* @__PURE__ */ new Map([
  [a.APPLET, I.HTML],
  [a.CAPTION, I.HTML],
  [a.HTML, I.HTML],
  [a.MARQUEE, I.HTML],
  [a.OBJECT, I.HTML],
  [a.TABLE, I.HTML],
  [a.TD, I.HTML],
  [a.TEMPLATE, I.HTML],
  [a.TH, I.HTML],
  [a.ANNOTATION_XML, I.MATHML],
  [a.MI, I.MATHML],
  [a.MN, I.MATHML],
  [a.MO, I.MATHML],
  [a.MS, I.MATHML],
  [a.MTEXT, I.MATHML],
  [a.DESC, I.SVG],
  [a.FOREIGN_OBJECT, I.SVG],
  [a.TITLE, I.SVG]
]), wh = [a.H1, a.H2, a.H3, a.H4, a.H5, a.H6], Bh = [a.TR, a.TEMPLATE, a.HTML], Fh = [a.TBODY, a.TFOOT, a.THEAD, a.TEMPLATE, a.HTML], Uh = [a.TABLE, a.TEMPLATE, a.HTML], Hh = [a.TD, a.TH];
class Yh {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(t, r, n) {
    this.treeAdapter = r, this.handler = n, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = a.UNKNOWN, this.current = t;
  }
  //Index of element
  _indexOf(t) {
    return this.items.lastIndexOf(t, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === a.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === I.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(t, r) {
    this.stackTop++, this.items[this.stackTop] = t, this.current = t, this.tagIDs[this.stackTop] = r, this.currentTagId = r, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(t, r, !0);
  }
  pop() {
    const t = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !0);
  }
  replace(t, r) {
    const n = this._indexOf(t);
    this.items[n] = r, n === this.stackTop && (this.current = r);
  }
  insertAfter(t, r, n) {
    const u = this._indexOf(t) + 1;
    this.items.splice(u, 0, r), this.tagIDs.splice(u, 0, n), this.stackTop++, u === this.stackTop && this._updateCurrentElement(), this.handler.onItemPush(this.current, this.currentTagId, u === this.stackTop);
  }
  popUntilTagNamePopped(t) {
    let r = this.stackTop + 1;
    do
      r = this.tagIDs.lastIndexOf(t, r - 1);
    while (r > 0 && this.treeAdapter.getNamespaceURI(this.items[r]) !== I.HTML);
    this.shortenToLength(r < 0 ? 0 : r);
  }
  shortenToLength(t) {
    for (; this.stackTop >= t; ) {
      const r = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(r, this.stackTop < t);
    }
  }
  popUntilElementPopped(t) {
    const r = this._indexOf(t);
    this.shortenToLength(r < 0 ? 0 : r);
  }
  popUntilPopped(t, r) {
    const n = this._indexOfTagNames(t, r);
    this.shortenToLength(n < 0 ? 0 : n);
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(wh, I.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(Hh, I.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(t, r) {
    for (let n = this.stackTop; n >= 0; n--)
      if (t.includes(this.tagIDs[n]) && this.treeAdapter.getNamespaceURI(this.items[n]) === r)
        return n;
    return -1;
  }
  clearBackTo(t, r) {
    const n = this._indexOfTagNames(t, r);
    this.shortenToLength(n + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(Uh, I.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(Fh, I.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(Bh, I.HTML);
  }
  remove(t) {
    const r = this._indexOf(t);
    r >= 0 && (r === this.stackTop ? this.pop() : (this.items.splice(r, 1), this.tagIDs.splice(r, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === a.BODY ? this.items[1] : null;
  }
  contains(t) {
    return this._indexOf(t) > -1;
  }
  getCommonAncestor(t) {
    const r = this._indexOf(t) - 1;
    return r >= 0 ? this.items[r] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === a.HTML;
  }
  //Element in scope
  hasInScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r], u = this.treeAdapter.getNamespaceURI(this.items[r]);
      if (n === t && u === I.HTML)
        return !0;
      if (pn.get(n) === u)
        return !1;
    }
    return !0;
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t], n = this.treeAdapter.getNamespaceURI(this.items[t]);
      if (Ia(r) && n === I.HTML)
        return !0;
      if (pn.get(r) === n)
        return !1;
    }
    return !0;
  }
  hasInListItemScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r], u = this.treeAdapter.getNamespaceURI(this.items[r]);
      if (n === t && u === I.HTML)
        return !0;
      if ((n === a.UL || n === a.OL) && u === I.HTML || pn.get(n) === u)
        return !1;
    }
    return !0;
  }
  hasInButtonScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r], u = this.treeAdapter.getNamespaceURI(this.items[r]);
      if (n === t && u === I.HTML)
        return !0;
      if (n === a.BUTTON && u === I.HTML || pn.get(n) === u)
        return !1;
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r];
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === I.HTML) {
        if (n === t)
          return !0;
        if (n === a.TABLE || n === a.TEMPLATE || n === a.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t];
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === I.HTML) {
        if (r === a.TBODY || r === a.THEAD || r === a.TFOOT)
          return !0;
        if (r === a.TABLE || r === a.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasInSelectScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r];
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === I.HTML) {
        if (n === t)
          return !0;
        if (n !== a.OPTION && n !== a.OPTGROUP)
          return !1;
      }
    }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; So.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; Li.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== t && Li.has(this.currentTagId); )
      this.pop();
  }
}
const Mu = 3;
var rt;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(rt = rt || (rt = {}));
const Di = { type: rt.Marker };
class $h {
  constructor(t) {
    this.treeAdapter = t, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(t, r) {
    const n = [], u = r.length, i = this.treeAdapter.getTagName(t), s = this.treeAdapter.getNamespaceURI(t);
    for (let c = 0; c < this.entries.length; c++) {
      const l = this.entries[c];
      if (l.type === rt.Marker)
        break;
      const { element: h } = l;
      if (this.treeAdapter.getTagName(h) === i && this.treeAdapter.getNamespaceURI(h) === s) {
        const T = this.treeAdapter.getAttrList(h);
        T.length === u && n.push({ idx: c, attrs: T });
      }
    }
    return n;
  }
  _ensureNoahArkCondition(t) {
    if (this.entries.length < Mu)
      return;
    const r = this.treeAdapter.getAttrList(t), n = this._getNoahArkConditionCandidates(t, r);
    if (n.length < Mu)
      return;
    const u = new Map(r.map((s) => [s.name, s.value]));
    let i = 0;
    for (let s = 0; s < n.length; s++) {
      const c = n[s];
      c.attrs.every((l) => u.get(l.name) === l.value) && (i += 1, i >= Mu && this.entries.splice(c.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(Di);
  }
  pushElement(t, r) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: rt.Element,
      element: t,
      token: r
    });
  }
  insertElementAfterBookmark(t, r) {
    const n = this.entries.indexOf(this.bookmark);
    this.entries.splice(n, 0, {
      type: rt.Element,
      element: t,
      token: r
    });
  }
  removeEntry(t) {
    const r = this.entries.indexOf(t);
    r >= 0 && this.entries.splice(r, 1);
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const t = this.entries.indexOf(Di);
    t >= 0 ? this.entries.splice(0, t + 1) : this.entries.length = 0;
  }
  //Search
  getElementEntryInScopeWithTagName(t) {
    const r = this.entries.find((n) => n.type === rt.Marker || this.treeAdapter.getTagName(n.element) === t);
    return r && r.type === rt.Element ? r : null;
  }
  getElementEntry(t) {
    return this.entries.find((r) => r.type === rt.Element && r.element === t);
  }
}
function Pi(e) {
  return {
    nodeName: "#text",
    value: e,
    parentNode: null
  };
}
const yt = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: $e.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(e, t, r) {
    return {
      nodeName: e,
      tagName: e,
      attrs: r,
      namespaceURI: t,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(e) {
    return {
      nodeName: "#comment",
      data: e,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(e, t) {
    e.childNodes.push(t), t.parentNode = e;
  },
  insertBefore(e, t, r) {
    const n = e.childNodes.indexOf(r);
    e.childNodes.splice(n, 0, t), t.parentNode = e;
  },
  setTemplateContent(e, t) {
    e.content = t;
  },
  getTemplateContent(e) {
    return e.content;
  },
  setDocumentType(e, t, r, n) {
    const u = e.childNodes.find((i) => i.nodeName === "#documentType");
    if (u)
      u.name = t, u.publicId = r, u.systemId = n;
    else {
      const i = {
        nodeName: "#documentType",
        name: t,
        publicId: r,
        systemId: n,
        parentNode: null
      };
      yt.appendChild(e, i);
    }
  },
  setDocumentMode(e, t) {
    e.mode = t;
  },
  getDocumentMode(e) {
    return e.mode;
  },
  detachNode(e) {
    if (e.parentNode) {
      const t = e.parentNode.childNodes.indexOf(e);
      e.parentNode.childNodes.splice(t, 1), e.parentNode = null;
    }
  },
  insertText(e, t) {
    if (e.childNodes.length > 0) {
      const r = e.childNodes[e.childNodes.length - 1];
      if (yt.isTextNode(r)) {
        r.value += t;
        return;
      }
    }
    yt.appendChild(e, Pi(t));
  },
  insertTextBefore(e, t, r) {
    const n = e.childNodes[e.childNodes.indexOf(r) - 1];
    n && yt.isTextNode(n) ? n.value += t : yt.insertBefore(e, Pi(t), r);
  },
  adoptAttributes(e, t) {
    const r = new Set(e.attrs.map((n) => n.name));
    for (let n = 0; n < t.length; n++)
      r.has(t[n].name) || e.attrs.push(t[n]);
  },
  //Tree traversing
  getFirstChild(e) {
    return e.childNodes[0];
  },
  getChildNodes(e) {
    return e.childNodes;
  },
  getParentNode(e) {
    return e.parentNode;
  },
  getAttrList(e) {
    return e.attrs;
  },
  //Node data
  getTagName(e) {
    return e.tagName;
  },
  getNamespaceURI(e) {
    return e.namespaceURI;
  },
  getTextNodeContent(e) {
    return e.value;
  },
  getCommentNodeContent(e) {
    return e.data;
  },
  getDocumentTypeNodeName(e) {
    return e.name;
  },
  getDocumentTypeNodePublicId(e) {
    return e.publicId;
  },
  getDocumentTypeNodeSystemId(e) {
    return e.systemId;
  },
  //Node types
  isTextNode(e) {
    return e.nodeName === "#text";
  },
  isCommentNode(e) {
    return e.nodeName === "#comment";
  },
  isDocumentTypeNode(e) {
    return e.nodeName === "#documentType";
  },
  isElementNode(e) {
    return Object.prototype.hasOwnProperty.call(e, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = t;
  },
  getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = { ...e.sourceCodeLocation, ...t };
  }
}, yo = "html", qh = "about:legacy-compat", jh = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", Oo = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
], Gh = [
  ...Oo,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], Wh = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), vo = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Qh = [
  ...vo,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function Mi(e, t) {
  return t.some((r) => e.startsWith(r));
}
function Vh(e) {
  return e.name === yo && e.publicId === null && (e.systemId === null || e.systemId === qh);
}
function Xh(e) {
  if (e.name !== yo)
    return $e.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === jh)
    return $e.QUIRKS;
  let { publicId: r } = e;
  if (r !== null) {
    if (r = r.toLowerCase(), Wh.has(r))
      return $e.QUIRKS;
    let n = t === null ? Gh : Oo;
    if (Mi(r, n))
      return $e.QUIRKS;
    if (n = t === null ? vo : Qh, Mi(r, n))
      return $e.LIMITED_QUIRKS;
  }
  return $e.NO_QUIRKS;
}
const ki = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, Kh = "definitionurl", zh = "definitionURL", Zh = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((e) => [e.toLowerCase(), e])), Jh = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: I.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: I.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: I.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: I.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: I.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: I.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: I.XLINK }],
  ["xml:base", { prefix: "xml", name: "base", namespace: I.XML }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: I.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: I.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: I.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: I.XMLNS }]
]), xo = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((e) => [e.toLowerCase(), e])), e1 = /* @__PURE__ */ new Set([
  a.B,
  a.BIG,
  a.BLOCKQUOTE,
  a.BODY,
  a.BR,
  a.CENTER,
  a.CODE,
  a.DD,
  a.DIV,
  a.DL,
  a.DT,
  a.EM,
  a.EMBED,
  a.H1,
  a.H2,
  a.H3,
  a.H4,
  a.H5,
  a.H6,
  a.HEAD,
  a.HR,
  a.I,
  a.IMG,
  a.LI,
  a.LISTING,
  a.MENU,
  a.META,
  a.NOBR,
  a.OL,
  a.P,
  a.PRE,
  a.RUBY,
  a.S,
  a.SMALL,
  a.SPAN,
  a.STRONG,
  a.STRIKE,
  a.SUB,
  a.SUP,
  a.TABLE,
  a.TT,
  a.U,
  a.UL,
  a.VAR
]);
function Ro(e) {
  const t = e.tagID;
  return t === a.FONT && e.attrs.some(({ name: n }) => n === _t.COLOR || n === _t.SIZE || n === _t.FACE) || e1.has(t);
}
function Sa(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === Kh) {
      e.attrs[t].name = zh;
      break;
    }
}
function ya(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = Zh.get(e.attrs[t].name);
    r != null && (e.attrs[t].name = r);
  }
}
function Zn(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = Jh.get(e.attrs[t].name);
    r && (e.attrs[t].prefix = r.prefix, e.attrs[t].name = r.name, e.attrs[t].namespace = r.namespace);
  }
}
function Lo(e) {
  const t = xo.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = Zr(e.tagName));
}
function t1(e, t) {
  return t === I.MATHML && (e === a.MI || e === a.MO || e === a.MN || e === a.MS || e === a.MTEXT);
}
function r1(e, t, r) {
  if (t === I.MATHML && e === a.ANNOTATION_XML) {
    for (let n = 0; n < r.length; n++)
      if (r[n].name === _t.ENCODING) {
        const u = r[n].value.toLowerCase();
        return u === ki.TEXT_HTML || u === ki.APPLICATION_XML;
      }
  }
  return t === I.SVG && (e === a.FOREIGN_OBJECT || e === a.DESC || e === a.TITLE);
}
function Do(e, t, r, n) {
  return (!n || n === I.HTML) && r1(e, t, r) || (!n || n === I.MATHML) && t1(e, t);
}
const n1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SVG_TAG_NAMES_ADJUSTMENT_MAP: xo,
  adjustTokenMathMLAttrs: Sa,
  adjustTokenSVGAttrs: ya,
  adjustTokenSVGTagName: Lo,
  adjustTokenXMLAttrs: Zn,
  causesExit: Ro,
  isIntegrationPoint: Do
}, Symbol.toStringTag, { value: "Module" })), u1 = "hidden", a1 = 8, i1 = 3;
var m;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(m || (m = {}));
const s1 = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, Po = /* @__PURE__ */ new Set([a.TABLE, a.TBODY, a.TFOOT, a.THEAD, a.TR]), wi = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: yt,
  onParseError: null
};
let Oa = class {
  constructor(t, r, n = null, u = null) {
    this.fragmentContext = n, this.scriptHandler = u, this.currentToken = null, this.stopped = !1, this.insertionMode = m.INITIAL, this.originalInsertionMode = m.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...wi,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = r ?? this.treeAdapter.createDocument(), this.tokenizer = new Io(this.options, this), this.activeFormattingElements = new $h(this.treeAdapter), this.fragmentContextID = n ? Zr(this.treeAdapter.getTagName(n)) : a.UNKNOWN, this._setContextModes(n ?? this.document, this.fragmentContextID), this.openElements = new Yh(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, r) {
    const n = new this(r);
    return n.tokenizer.write(t, !0), n.document;
  }
  static getFragmentParser(t, r) {
    const n = {
      ...wi,
      ...r
    };
    t ?? (t = n.treeAdapter.createElement(b.TEMPLATE, I.HTML, []));
    const u = n.treeAdapter.createElement("documentmock", I.HTML, []), i = new this(n, u, t);
    return i.fragmentContextID === a.TEMPLATE && i.tmplInsertionModeStack.unshift(m.IN_TEMPLATE), i._initTokenizerForFragmentParsing(), i._insertFakeRootElement(), i._resetInsertionMode(), i._findFormInFragmentContext(), i;
  }
  getFragment() {
    const t = this.treeAdapter.getFirstChild(this.document), r = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(t, r), r;
  }
  //Errors
  _err(t, r, n) {
    var u;
    if (!this.onParseError)
      return;
    const i = (u = t.location) !== null && u !== void 0 ? u : s1, s = {
      code: r,
      startLine: i.startLine,
      startCol: i.startCol,
      startOffset: i.startOffset,
      endLine: n ? i.startLine : i.endLine,
      endCol: n ? i.startCol : i.endCol,
      endOffset: n ? i.startOffset : i.endOffset
    };
    this.onParseError(s);
  }
  //Stack events
  onItemPush(t, r, n) {
    var u, i;
    (i = (u = this.treeAdapter).onItemPush) === null || i === void 0 || i.call(u, t), n && this.openElements.stackTop > 0 && this._setContextModes(t, r);
  }
  onItemPop(t, r) {
    var n, u;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (u = (n = this.treeAdapter).onItemPop) === null || u === void 0 || u.call(n, t, this.openElements.current), r) {
      let i, s;
      this.openElements.stackTop === 0 && this.fragmentContext ? (i = this.fragmentContext, s = this.fragmentContextID) : { current: i, currentTagId: s } = this.openElements, this._setContextModes(i, s);
    }
  }
  _setContextModes(t, r) {
    const n = t === this.document || this.treeAdapter.getNamespaceURI(t) === I.HTML;
    this.currentNotInHTML = !n, this.tokenizer.inForeignNode = !n && !this._isIntegrationPoint(r, t);
  }
  _switchToTextParsing(t, r) {
    this._insertElement(t, I.HTML), this.tokenizer.state = r, this.originalInsertionMode = this.insertionMode, this.insertionMode = m.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = m.TEXT, this.originalInsertionMode = m.IN_BODY, this.tokenizer.state = qe.PLAINTEXT;
  }
  //Fragment parsing
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  _findFormInFragmentContext() {
    let t = this.fragmentContext;
    for (; t; ) {
      if (this.treeAdapter.getTagName(t) === b.FORM) {
        this.formElement = t;
        break;
      }
      t = this.treeAdapter.getParentNode(t);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== I.HTML))
      switch (this.fragmentContextID) {
        case a.TITLE:
        case a.TEXTAREA: {
          this.tokenizer.state = qe.RCDATA;
          break;
        }
        case a.STYLE:
        case a.XMP:
        case a.IFRAME:
        case a.NOEMBED:
        case a.NOFRAMES:
        case a.NOSCRIPT: {
          this.tokenizer.state = qe.RAWTEXT;
          break;
        }
        case a.SCRIPT: {
          this.tokenizer.state = qe.SCRIPT_DATA;
          break;
        }
        case a.PLAINTEXT: {
          this.tokenizer.state = qe.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  _setDocumentType(t) {
    const r = t.name || "", n = t.publicId || "", u = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, r, n, u), t.location) {
      const s = this.treeAdapter.getChildNodes(this.document).find((c) => this.treeAdapter.isDocumentTypeNode(c));
      s && this.treeAdapter.setNodeSourceCodeLocation(s, t.location);
    }
  }
  _attachElementToTree(t, r) {
    if (this.options.sourceCodeLocationInfo) {
      const n = r && {
        ...r,
        startTag: r
      };
      this.treeAdapter.setNodeSourceCodeLocation(t, n);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(t);
    else {
      const n = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(n, t);
    }
  }
  _appendElement(t, r) {
    const n = this.treeAdapter.createElement(t.tagName, r, t.attrs);
    this._attachElementToTree(n, t.location);
  }
  _insertElement(t, r) {
    const n = this.treeAdapter.createElement(t.tagName, r, t.attrs);
    this._attachElementToTree(n, t.location), this.openElements.push(n, t.tagID);
  }
  _insertFakeElement(t, r) {
    const n = this.treeAdapter.createElement(t, I.HTML, []);
    this._attachElementToTree(n, null), this.openElements.push(n, r);
  }
  _insertTemplate(t) {
    const r = this.treeAdapter.createElement(t.tagName, I.HTML, t.attrs), n = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(r, n), this._attachElementToTree(r, t.location), this.openElements.push(r, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, null);
  }
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(b.HTML, I.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, a.HTML);
  }
  _appendCommentNode(t, r) {
    const n = this.treeAdapter.createCommentNode(t.data);
    this.treeAdapter.appendChild(r, n), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, t.location);
  }
  _insertCharacters(t) {
    let r, n;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: r, beforeElement: n } = this._findFosterParentingLocation(), n ? this.treeAdapter.insertTextBefore(r, t.chars, n) : this.treeAdapter.insertText(r, t.chars)) : (r = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(r, t.chars)), !t.location)
      return;
    const u = this.treeAdapter.getChildNodes(r), i = n ? u.lastIndexOf(n) : u.length, s = u[i - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(s)) {
      const { endLine: l, endCol: h, endOffset: T } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(s, { endLine: l, endCol: h, endOffset: T });
    } else
      this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s, t.location);
  }
  _adoptNodes(t, r) {
    for (let n = this.treeAdapter.getFirstChild(t); n; n = this.treeAdapter.getFirstChild(t))
      this.treeAdapter.detachNode(n), this.treeAdapter.appendChild(r, n);
  }
  _setEndLocation(t, r) {
    if (this.treeAdapter.getNodeSourceCodeLocation(t) && r.location) {
      const n = r.location, u = this.treeAdapter.getTagName(t), i = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        r.type === ie.END_TAG && u === r.tagName ? {
          endTag: { ...n },
          endLine: n.endLine,
          endCol: n.endCol,
          endOffset: n.endOffset
        } : {
          endLine: n.startLine,
          endCol: n.startCol,
          endOffset: n.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(t, i);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(t) {
    if (!this.currentNotInHTML)
      return !1;
    let r, n;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (r = this.fragmentContext, n = this.fragmentContextID) : { current: r, currentTagId: n } = this.openElements, t.tagID === a.SVG && this.treeAdapter.getTagName(r) === b.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(r) === I.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === a.MGLYPH || t.tagID === a.MALIGNMARK) && !this._isIntegrationPoint(n, r, I.HTML)
    );
  }
  _processToken(t) {
    switch (t.type) {
      case ie.CHARACTER: {
        this.onCharacter(t);
        break;
      }
      case ie.NULL_CHARACTER: {
        this.onNullCharacter(t);
        break;
      }
      case ie.COMMENT: {
        this.onComment(t);
        break;
      }
      case ie.DOCTYPE: {
        this.onDoctype(t);
        break;
      }
      case ie.START_TAG: {
        this._processStartTag(t);
        break;
      }
      case ie.END_TAG: {
        this.onEndTag(t);
        break;
      }
      case ie.EOF: {
        this.onEof(t);
        break;
      }
      case ie.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(t);
        break;
      }
    }
  }
  //Integration points
  _isIntegrationPoint(t, r, n) {
    const u = this.treeAdapter.getNamespaceURI(r), i = this.treeAdapter.getAttrList(r);
    return Do(t, u, i, n);
  }
  //Active formatting elements reconstruction
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const r = this.activeFormattingElements.entries.findIndex((u) => u.type === rt.Marker || this.openElements.contains(u.element)), n = r < 0 ? t - 1 : r - 1;
      for (let u = n; u >= 0; u--) {
        const i = this.activeFormattingElements.entries[u];
        this._insertElement(i.token, this.treeAdapter.getNamespaceURI(i.element)), i.element = this.openElements.current;
      }
    }
  }
  //Close elements
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = m.IN_ROW;
  }
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(a.P), this.openElements.popUntilTagNamePopped(a.P);
  }
  //Insertion modes
  _resetInsertionMode() {
    for (let t = this.openElements.stackTop; t >= 0; t--)
      switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
        case a.TR: {
          this.insertionMode = m.IN_ROW;
          return;
        }
        case a.TBODY:
        case a.THEAD:
        case a.TFOOT: {
          this.insertionMode = m.IN_TABLE_BODY;
          return;
        }
        case a.CAPTION: {
          this.insertionMode = m.IN_CAPTION;
          return;
        }
        case a.COLGROUP: {
          this.insertionMode = m.IN_COLUMN_GROUP;
          return;
        }
        case a.TABLE: {
          this.insertionMode = m.IN_TABLE;
          return;
        }
        case a.BODY: {
          this.insertionMode = m.IN_BODY;
          return;
        }
        case a.FRAMESET: {
          this.insertionMode = m.IN_FRAMESET;
          return;
        }
        case a.SELECT: {
          this._resetInsertionModeForSelect(t);
          return;
        }
        case a.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case a.HTML: {
          this.insertionMode = this.headElement ? m.AFTER_HEAD : m.BEFORE_HEAD;
          return;
        }
        case a.TD:
        case a.TH: {
          if (t > 0) {
            this.insertionMode = m.IN_CELL;
            return;
          }
          break;
        }
        case a.HEAD: {
          if (t > 0) {
            this.insertionMode = m.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = m.IN_BODY;
  }
  _resetInsertionModeForSelect(t) {
    if (t > 0)
      for (let r = t - 1; r > 0; r--) {
        const n = this.openElements.tagIDs[r];
        if (n === a.TEMPLATE)
          break;
        if (n === a.TABLE) {
          this.insertionMode = m.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = m.IN_SELECT;
  }
  //Foster parenting
  _isElementCausesFosterParenting(t) {
    return Po.has(t);
  }
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  _findFosterParentingLocation() {
    for (let t = this.openElements.stackTop; t >= 0; t--) {
      const r = this.openElements.items[t];
      switch (this.openElements.tagIDs[t]) {
        case a.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(r) === I.HTML)
            return { parent: this.treeAdapter.getTemplateContent(r), beforeElement: null };
          break;
        }
        case a.TABLE: {
          const n = this.treeAdapter.getParentNode(r);
          return n ? { parent: n, beforeElement: r } : { parent: this.openElements.items[t - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  _fosterParentElement(t) {
    const r = this._findFosterParentingLocation();
    r.beforeElement ? this.treeAdapter.insertBefore(r.parent, t, r.beforeElement) : this.treeAdapter.appendChild(r.parent, t);
  }
  //Special elements
  _isSpecialElement(t, r) {
    const n = this.treeAdapter.getNamespaceURI(t);
    return go[n].has(r);
  }
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      BE(this, t);
      return;
    }
    switch (this.insertionMode) {
      case m.INITIAL: {
        vr(this, t);
        break;
      }
      case m.BEFORE_HTML: {
        Mr(this, t);
        break;
      }
      case m.BEFORE_HEAD: {
        kr(this, t);
        break;
      }
      case m.IN_HEAD: {
        wr(this, t);
        break;
      }
      case m.IN_HEAD_NO_SCRIPT: {
        Br(this, t);
        break;
      }
      case m.AFTER_HEAD: {
        Fr(this, t);
        break;
      }
      case m.IN_BODY:
      case m.IN_CAPTION:
      case m.IN_CELL:
      case m.IN_TEMPLATE: {
        ko(this, t);
        break;
      }
      case m.TEXT:
      case m.IN_SELECT:
      case m.IN_SELECT_IN_TABLE: {
        this._insertCharacters(t);
        break;
      }
      case m.IN_TABLE:
      case m.IN_TABLE_BODY:
      case m.IN_ROW: {
        ku(this, t);
        break;
      }
      case m.IN_TABLE_TEXT: {
        Yo(this, t);
        break;
      }
      case m.IN_COLUMN_GROUP: {
        Mn(this, t);
        break;
      }
      case m.AFTER_BODY: {
        kn(this, t);
        break;
      }
      case m.AFTER_AFTER_BODY: {
        Cn(this, t);
        break;
      }
    }
  }
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      wE(this, t);
      return;
    }
    switch (this.insertionMode) {
      case m.INITIAL: {
        vr(this, t);
        break;
      }
      case m.BEFORE_HTML: {
        Mr(this, t);
        break;
      }
      case m.BEFORE_HEAD: {
        kr(this, t);
        break;
      }
      case m.IN_HEAD: {
        wr(this, t);
        break;
      }
      case m.IN_HEAD_NO_SCRIPT: {
        Br(this, t);
        break;
      }
      case m.AFTER_HEAD: {
        Fr(this, t);
        break;
      }
      case m.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case m.IN_TABLE:
      case m.IN_TABLE_BODY:
      case m.IN_ROW: {
        ku(this, t);
        break;
      }
      case m.IN_COLUMN_GROUP: {
        Mn(this, t);
        break;
      }
      case m.AFTER_BODY: {
        kn(this, t);
        break;
      }
      case m.AFTER_AFTER_BODY: {
        Cn(this, t);
        break;
      }
    }
  }
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Ku(this, t);
      return;
    }
    switch (this.insertionMode) {
      case m.INITIAL:
      case m.BEFORE_HTML:
      case m.BEFORE_HEAD:
      case m.IN_HEAD:
      case m.IN_HEAD_NO_SCRIPT:
      case m.AFTER_HEAD:
      case m.IN_BODY:
      case m.IN_TABLE:
      case m.IN_CAPTION:
      case m.IN_COLUMN_GROUP:
      case m.IN_TABLE_BODY:
      case m.IN_ROW:
      case m.IN_CELL:
      case m.IN_SELECT:
      case m.IN_SELECT_IN_TABLE:
      case m.IN_TEMPLATE:
      case m.IN_FRAMESET:
      case m.AFTER_FRAMESET: {
        Ku(this, t);
        break;
      }
      case m.IN_TABLE_TEXT: {
        xr(this, t);
        break;
      }
      case m.AFTER_BODY: {
        E1(this, t);
        break;
      }
      case m.AFTER_AFTER_BODY:
      case m.AFTER_AFTER_FRAMESET: {
        m1(this, t);
        break;
      }
    }
  }
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case m.INITIAL: {
        T1(this, t);
        break;
      }
      case m.BEFORE_HEAD:
      case m.IN_HEAD:
      case m.IN_HEAD_NO_SCRIPT:
      case m.AFTER_HEAD: {
        this._err(t, A.misplacedDoctype);
        break;
      }
      case m.IN_TABLE_TEXT: {
        xr(this, t);
        break;
      }
    }
  }
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, A.nonVoidHtmlElementStartTagWithTrailingSolidus);
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   */
  _processStartTag(t) {
    this.shouldProcessStartTagTokenInForeignContent(t) ? FE(this, t) : this._startTagOutsideForeignContent(t);
  }
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case m.INITIAL: {
        vr(this, t);
        break;
      }
      case m.BEFORE_HTML: {
        b1(this, t);
        break;
      }
      case m.BEFORE_HEAD: {
        g1(this, t);
        break;
      }
      case m.IN_HEAD: {
        st(this, t);
        break;
      }
      case m.IN_HEAD_NO_SCRIPT: {
        C1(this, t);
        break;
      }
      case m.AFTER_HEAD: {
        I1(this, t);
        break;
      }
      case m.IN_BODY: {
        Ue(this, t);
        break;
      }
      case m.IN_TABLE: {
        hr(this, t);
        break;
      }
      case m.IN_TABLE_TEXT: {
        xr(this, t);
        break;
      }
      case m.IN_CAPTION: {
        _E(this, t);
        break;
      }
      case m.IN_COLUMN_GROUP: {
        Ra(this, t);
        break;
      }
      case m.IN_TABLE_BODY: {
        tu(this, t);
        break;
      }
      case m.IN_ROW: {
        ru(this, t);
        break;
      }
      case m.IN_CELL: {
        NE(this, t);
        break;
      }
      case m.IN_SELECT: {
        jo(this, t);
        break;
      }
      case m.IN_SELECT_IN_TABLE: {
        SE(this, t);
        break;
      }
      case m.IN_TEMPLATE: {
        OE(this, t);
        break;
      }
      case m.AFTER_BODY: {
        xE(this, t);
        break;
      }
      case m.IN_FRAMESET: {
        RE(this, t);
        break;
      }
      case m.AFTER_FRAMESET: {
        DE(this, t);
        break;
      }
      case m.AFTER_AFTER_BODY: {
        ME(this, t);
        break;
      }
      case m.AFTER_AFTER_FRAMESET: {
        kE(this, t);
        break;
      }
    }
  }
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? UE(this, t) : this._endTagOutsideForeignContent(t);
  }
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case m.INITIAL: {
        vr(this, t);
        break;
      }
      case m.BEFORE_HTML: {
        p1(this, t);
        break;
      }
      case m.BEFORE_HEAD: {
        _1(this, t);
        break;
      }
      case m.IN_HEAD: {
        A1(this, t);
        break;
      }
      case m.IN_HEAD_NO_SCRIPT: {
        N1(this, t);
        break;
      }
      case m.AFTER_HEAD: {
        S1(this, t);
        break;
      }
      case m.IN_BODY: {
        eu(this, t);
        break;
      }
      case m.TEXT: {
        lE(this, t);
        break;
      }
      case m.IN_TABLE: {
        Yr(this, t);
        break;
      }
      case m.IN_TABLE_TEXT: {
        xr(this, t);
        break;
      }
      case m.IN_CAPTION: {
        AE(this, t);
        break;
      }
      case m.IN_COLUMN_GROUP: {
        CE(this, t);
        break;
      }
      case m.IN_TABLE_BODY: {
        zu(this, t);
        break;
      }
      case m.IN_ROW: {
        qo(this, t);
        break;
      }
      case m.IN_CELL: {
        IE(this, t);
        break;
      }
      case m.IN_SELECT: {
        Go(this, t);
        break;
      }
      case m.IN_SELECT_IN_TABLE: {
        yE(this, t);
        break;
      }
      case m.IN_TEMPLATE: {
        vE(this, t);
        break;
      }
      case m.AFTER_BODY: {
        Qo(this, t);
        break;
      }
      case m.IN_FRAMESET: {
        LE(this, t);
        break;
      }
      case m.AFTER_FRAMESET: {
        PE(this, t);
        break;
      }
      case m.AFTER_AFTER_BODY: {
        Cn(this, t);
        break;
      }
    }
  }
  onEof(t) {
    switch (this.insertionMode) {
      case m.INITIAL: {
        vr(this, t);
        break;
      }
      case m.BEFORE_HTML: {
        Mr(this, t);
        break;
      }
      case m.BEFORE_HEAD: {
        kr(this, t);
        break;
      }
      case m.IN_HEAD: {
        wr(this, t);
        break;
      }
      case m.IN_HEAD_NO_SCRIPT: {
        Br(this, t);
        break;
      }
      case m.AFTER_HEAD: {
        Fr(this, t);
        break;
      }
      case m.IN_BODY:
      case m.IN_TABLE:
      case m.IN_CAPTION:
      case m.IN_COLUMN_GROUP:
      case m.IN_TABLE_BODY:
      case m.IN_ROW:
      case m.IN_CELL:
      case m.IN_SELECT:
      case m.IN_SELECT_IN_TABLE: {
        Uo(this, t);
        break;
      }
      case m.TEXT: {
        fE(this, t);
        break;
      }
      case m.IN_TABLE_TEXT: {
        xr(this, t);
        break;
      }
      case m.IN_TEMPLATE: {
        Wo(this, t);
        break;
      }
      case m.AFTER_BODY:
      case m.IN_FRAMESET:
      case m.AFTER_FRAMESET:
      case m.AFTER_AFTER_BODY:
      case m.AFTER_AFTER_FRAMESET: {
        xa(this, t);
        break;
      }
    }
  }
  onWhitespaceCharacter(t) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, t.chars.charCodeAt(0) === f.LINE_FEED)) {
      if (t.chars.length === 1)
        return;
      t.chars = t.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(t);
      return;
    }
    switch (this.insertionMode) {
      case m.IN_HEAD:
      case m.IN_HEAD_NO_SCRIPT:
      case m.AFTER_HEAD:
      case m.TEXT:
      case m.IN_COLUMN_GROUP:
      case m.IN_SELECT:
      case m.IN_SELECT_IN_TABLE:
      case m.IN_FRAMESET:
      case m.AFTER_FRAMESET: {
        this._insertCharacters(t);
        break;
      }
      case m.IN_BODY:
      case m.IN_CAPTION:
      case m.IN_CELL:
      case m.IN_TEMPLATE:
      case m.AFTER_BODY:
      case m.AFTER_AFTER_BODY:
      case m.AFTER_AFTER_FRAMESET: {
        Mo(this, t);
        break;
      }
      case m.IN_TABLE:
      case m.IN_TABLE_BODY:
      case m.IN_ROW: {
        ku(this, t);
        break;
      }
      case m.IN_TABLE_TEXT: {
        Ho(this, t);
        break;
      }
    }
  }
};
function o1(e, t) {
  let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return r ? e.openElements.contains(r.element) ? e.openElements.hasInScope(t.tagID) || (r = null) : (e.activeFormattingElements.removeEntry(r), r = null) : Fo(e, t), r;
}
function c1(e, t) {
  let r = null, n = e.openElements.stackTop;
  for (; n >= 0; n--) {
    const u = e.openElements.items[n];
    if (u === t.element)
      break;
    e._isSpecialElement(u, e.openElements.tagIDs[n]) && (r = u);
  }
  return r || (e.openElements.shortenToLength(n < 0 ? 0 : n), e.activeFormattingElements.removeEntry(t)), r;
}
function l1(e, t, r) {
  let n = t, u = e.openElements.getCommonAncestor(t);
  for (let i = 0, s = u; s !== r; i++, s = u) {
    u = e.openElements.getCommonAncestor(s);
    const c = e.activeFormattingElements.getElementEntry(s), l = c && i >= i1;
    !c || l ? (l && e.activeFormattingElements.removeEntry(c), e.openElements.remove(s)) : (s = f1(e, c), n === t && (e.activeFormattingElements.bookmark = c), e.treeAdapter.detachNode(n), e.treeAdapter.appendChild(s, n), n = s);
  }
  return n;
}
function f1(e, t) {
  const r = e.treeAdapter.getNamespaceURI(t.element), n = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
  return e.openElements.replace(t.element, n), t.element = n, n;
}
function d1(e, t, r) {
  const n = e.treeAdapter.getTagName(t), u = Zr(n);
  if (e._isElementCausesFosterParenting(u))
    e._fosterParentElement(r);
  else {
    const i = e.treeAdapter.getNamespaceURI(t);
    u === a.TEMPLATE && i === I.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, r);
  }
}
function h1(e, t, r) {
  const n = e.treeAdapter.getNamespaceURI(r.element), { token: u } = r, i = e.treeAdapter.createElement(u.tagName, n, u.attrs);
  e._adoptNodes(t, i), e.treeAdapter.appendChild(t, i), e.activeFormattingElements.insertElementAfterBookmark(i, u), e.activeFormattingElements.removeEntry(r), e.openElements.remove(r.element), e.openElements.insertAfter(t, i, u.tagID);
}
function va(e, t) {
  for (let r = 0; r < a1; r++) {
    const n = o1(e, t);
    if (!n)
      break;
    const u = c1(e, n);
    if (!u)
      break;
    e.activeFormattingElements.bookmark = n;
    const i = l1(e, u, n.element), s = e.openElements.getCommonAncestor(n.element);
    e.treeAdapter.detachNode(i), s && d1(e, s, i), h1(e, u, n);
  }
}
function Ku(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function E1(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function m1(e, t) {
  e._appendCommentNode(t, e.document);
}
function xa(e, t) {
  if (e.stopped = !0, t.location) {
    const r = e.fragmentContext ? 0 : 2;
    for (let n = e.openElements.stackTop; n >= r; n--)
      e._setEndLocation(e.openElements.items[n], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const n = e.openElements.items[0], u = e.treeAdapter.getNodeSourceCodeLocation(n);
      if (u && !u.endTag && (e._setEndLocation(n, t), e.openElements.stackTop >= 1)) {
        const i = e.openElements.items[1], s = e.treeAdapter.getNodeSourceCodeLocation(i);
        s && !s.endTag && e._setEndLocation(i, t);
      }
    }
  }
}
function T1(e, t) {
  e._setDocumentType(t);
  const r = t.forceQuirks ? $e.QUIRKS : Xh(t);
  Vh(t) || e._err(t, A.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, r), e.insertionMode = m.BEFORE_HTML;
}
function vr(e, t) {
  e._err(t, A.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, $e.QUIRKS), e.insertionMode = m.BEFORE_HTML, e._processToken(t);
}
function b1(e, t) {
  t.tagID === a.HTML ? (e._insertElement(t, I.HTML), e.insertionMode = m.BEFORE_HEAD) : Mr(e, t);
}
function p1(e, t) {
  const r = t.tagID;
  (r === a.HTML || r === a.HEAD || r === a.BODY || r === a.BR) && Mr(e, t);
}
function Mr(e, t) {
  e._insertFakeRootElement(), e.insertionMode = m.BEFORE_HEAD, e._processToken(t);
}
function g1(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      Ue(e, t);
      break;
    }
    case a.HEAD: {
      e._insertElement(t, I.HTML), e.headElement = e.openElements.current, e.insertionMode = m.IN_HEAD;
      break;
    }
    default:
      kr(e, t);
  }
}
function _1(e, t) {
  const r = t.tagID;
  r === a.HEAD || r === a.BODY || r === a.HTML || r === a.BR ? kr(e, t) : e._err(t, A.endTagWithoutMatchingOpenElement);
}
function kr(e, t) {
  e._insertFakeElement(b.HEAD, a.HEAD), e.headElement = e.openElements.current, e.insertionMode = m.IN_HEAD, e._processToken(t);
}
function st(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      Ue(e, t);
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META: {
      e._appendElement(t, I.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TITLE: {
      e._switchToTextParsing(t, qe.RCDATA);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, qe.RAWTEXT) : (e._insertElement(t, I.HTML), e.insertionMode = m.IN_HEAD_NO_SCRIPT);
      break;
    }
    case a.NOFRAMES:
    case a.STYLE: {
      e._switchToTextParsing(t, qe.RAWTEXT);
      break;
    }
    case a.SCRIPT: {
      e._switchToTextParsing(t, qe.SCRIPT_DATA);
      break;
    }
    case a.TEMPLATE: {
      e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = m.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(m.IN_TEMPLATE);
      break;
    }
    case a.HEAD: {
      e._err(t, A.misplacedStartTagForHeadElement);
      break;
    }
    default:
      wr(e, t);
  }
}
function A1(e, t) {
  switch (t.tagID) {
    case a.HEAD: {
      e.openElements.pop(), e.insertionMode = m.AFTER_HEAD;
      break;
    }
    case a.BODY:
    case a.BR:
    case a.HTML: {
      wr(e, t);
      break;
    }
    case a.TEMPLATE: {
      Vt(e, t);
      break;
    }
    default:
      e._err(t, A.endTagWithoutMatchingOpenElement);
  }
}
function Vt(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== a.TEMPLATE && e._err(t, A.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, A.endTagWithoutMatchingOpenElement);
}
function wr(e, t) {
  e.openElements.pop(), e.insertionMode = m.AFTER_HEAD, e._processToken(t);
}
function C1(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      Ue(e, t);
      break;
    }
    case a.BASEFONT:
    case a.BGSOUND:
    case a.HEAD:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.STYLE: {
      st(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e._err(t, A.nestedNoscriptInHead);
      break;
    }
    default:
      Br(e, t);
  }
}
function N1(e, t) {
  switch (t.tagID) {
    case a.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = m.IN_HEAD;
      break;
    }
    case a.BR: {
      Br(e, t);
      break;
    }
    default:
      e._err(t, A.endTagWithoutMatchingOpenElement);
  }
}
function Br(e, t) {
  const r = t.type === ie.EOF ? A.openElementsLeftAfterEof : A.disallowedContentInNoscriptInHead;
  e._err(t, r), e.openElements.pop(), e.insertionMode = m.IN_HEAD, e._processToken(t);
}
function I1(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      Ue(e, t);
      break;
    }
    case a.BODY: {
      e._insertElement(t, I.HTML), e.framesetOk = !1, e.insertionMode = m.IN_BODY;
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, I.HTML), e.insertionMode = m.IN_FRAMESET;
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      e._err(t, A.abandonedHeadElementChild), e.openElements.push(e.headElement, a.HEAD), st(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case a.HEAD: {
      e._err(t, A.misplacedStartTagForHeadElement);
      break;
    }
    default:
      Fr(e, t);
  }
}
function S1(e, t) {
  switch (t.tagID) {
    case a.BODY:
    case a.HTML:
    case a.BR: {
      Fr(e, t);
      break;
    }
    case a.TEMPLATE: {
      Vt(e, t);
      break;
    }
    default:
      e._err(t, A.endTagWithoutMatchingOpenElement);
  }
}
function Fr(e, t) {
  e._insertFakeElement(b.BODY, a.BODY), e.insertionMode = m.IN_BODY, Jn(e, t);
}
function Jn(e, t) {
  switch (t.type) {
    case ie.CHARACTER: {
      ko(e, t);
      break;
    }
    case ie.WHITESPACE_CHARACTER: {
      Mo(e, t);
      break;
    }
    case ie.COMMENT: {
      Ku(e, t);
      break;
    }
    case ie.START_TAG: {
      Ue(e, t);
      break;
    }
    case ie.END_TAG: {
      eu(e, t);
      break;
    }
    case ie.EOF: {
      Uo(e, t);
      break;
    }
  }
}
function Mo(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function ko(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function y1(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function O1(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  r && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(r, t.attrs));
}
function v1(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && r && (e.treeAdapter.detachNode(r), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, I.HTML), e.insertionMode = m.IN_FRAMESET);
}
function x1(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, I.HTML);
}
function R1(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), Ia(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, I.HTML);
}
function L1(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, I.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function D1(e, t) {
  const r = e.openElements.tmplCount > 0;
  (!e.formElement || r) && (e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, I.HTML), r || (e.formElement = e.openElements.current));
}
function P1(e, t) {
  e.framesetOk = !1;
  const r = t.tagID;
  for (let n = e.openElements.stackTop; n >= 0; n--) {
    const u = e.openElements.tagIDs[n];
    if (r === a.LI && u === a.LI || (r === a.DD || r === a.DT) && (u === a.DD || u === a.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(u), e.openElements.popUntilTagNamePopped(u);
      break;
    }
    if (u !== a.ADDRESS && u !== a.DIV && u !== a.P && e._isSpecialElement(e.openElements.items[n], u))
      break;
  }
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, I.HTML);
}
function M1(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, I.HTML), e.tokenizer.state = qe.PLAINTEXT;
}
function k1(e, t) {
  e.openElements.hasInScope(a.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, I.HTML), e.framesetOk = !1;
}
function w1(e, t) {
  const r = e.activeFormattingElements.getElementEntryInScopeWithTagName(b.A);
  r && (va(e, t), e.openElements.remove(r.element), e.activeFormattingElements.removeEntry(r)), e._reconstructActiveFormattingElements(), e._insertElement(t, I.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function B1(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, I.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function F1(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(a.NOBR) && (va(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, I.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function U1(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, I.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function H1(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== $e.QUIRKS && e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, I.HTML), e.framesetOk = !1, e.insertionMode = m.IN_TABLE;
}
function wo(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, I.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function Bo(e) {
  const t = Na(e, _t.TYPE);
  return t != null && t.toLowerCase() === u1;
}
function Y1(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, I.HTML), Bo(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function $1(e, t) {
  e._appendElement(t, I.HTML), t.ackSelfClosing = !0;
}
function q1(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._appendElement(t, I.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function j1(e, t) {
  t.tagName = b.IMG, t.tagID = a.IMG, wo(e, t);
}
function G1(e, t) {
  e._insertElement(t, I.HTML), e.skipNextNewLine = !0, e.tokenizer.state = qe.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = m.TEXT;
}
function W1(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, qe.RAWTEXT);
}
function Q1(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, qe.RAWTEXT);
}
function Bi(e, t) {
  e._switchToTextParsing(t, qe.RAWTEXT);
}
function V1(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, I.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === m.IN_TABLE || e.insertionMode === m.IN_CAPTION || e.insertionMode === m.IN_TABLE_BODY || e.insertionMode === m.IN_ROW || e.insertionMode === m.IN_CELL ? m.IN_SELECT_IN_TABLE : m.IN_SELECT;
}
function X1(e, t) {
  e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, I.HTML);
}
function K1(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, I.HTML);
}
function z1(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(a.RTC), e._insertElement(t, I.HTML);
}
function Z1(e, t) {
  e._reconstructActiveFormattingElements(), Sa(t), Zn(t), t.selfClosing ? e._appendElement(t, I.MATHML) : e._insertElement(t, I.MATHML), t.ackSelfClosing = !0;
}
function J1(e, t) {
  e._reconstructActiveFormattingElements(), ya(t), Zn(t), t.selfClosing ? e._appendElement(t, I.SVG) : e._insertElement(t, I.SVG), t.ackSelfClosing = !0;
}
function Fi(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, I.HTML);
}
function Ue(e, t) {
  switch (t.tagID) {
    case a.I:
    case a.S:
    case a.B:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      B1(e, t);
      break;
    }
    case a.A: {
      w1(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      R1(e, t);
      break;
    }
    case a.P:
    case a.DL:
    case a.OL:
    case a.UL:
    case a.DIV:
    case a.DIR:
    case a.NAV:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.DETAILS:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.SECTION:
    case a.SUMMARY:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      x1(e, t);
      break;
    }
    case a.LI:
    case a.DD:
    case a.DT: {
      P1(e, t);
      break;
    }
    case a.BR:
    case a.IMG:
    case a.WBR:
    case a.AREA:
    case a.EMBED:
    case a.KEYGEN: {
      wo(e, t);
      break;
    }
    case a.HR: {
      q1(e, t);
      break;
    }
    case a.RB:
    case a.RTC: {
      K1(e, t);
      break;
    }
    case a.RT:
    case a.RP: {
      z1(e, t);
      break;
    }
    case a.PRE:
    case a.LISTING: {
      L1(e, t);
      break;
    }
    case a.XMP: {
      W1(e, t);
      break;
    }
    case a.SVG: {
      J1(e, t);
      break;
    }
    case a.HTML: {
      y1(e, t);
      break;
    }
    case a.BASE:
    case a.LINK:
    case a.META:
    case a.STYLE:
    case a.TITLE:
    case a.SCRIPT:
    case a.BGSOUND:
    case a.BASEFONT:
    case a.TEMPLATE: {
      st(e, t);
      break;
    }
    case a.BODY: {
      O1(e, t);
      break;
    }
    case a.FORM: {
      D1(e, t);
      break;
    }
    case a.NOBR: {
      F1(e, t);
      break;
    }
    case a.MATH: {
      Z1(e, t);
      break;
    }
    case a.TABLE: {
      H1(e, t);
      break;
    }
    case a.INPUT: {
      Y1(e, t);
      break;
    }
    case a.PARAM:
    case a.TRACK:
    case a.SOURCE: {
      $1(e, t);
      break;
    }
    case a.IMAGE: {
      j1(e, t);
      break;
    }
    case a.BUTTON: {
      k1(e, t);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      U1(e, t);
      break;
    }
    case a.IFRAME: {
      Q1(e, t);
      break;
    }
    case a.SELECT: {
      V1(e, t);
      break;
    }
    case a.OPTION:
    case a.OPTGROUP: {
      X1(e, t);
      break;
    }
    case a.NOEMBED: {
      Bi(e, t);
      break;
    }
    case a.FRAMESET: {
      v1(e, t);
      break;
    }
    case a.TEXTAREA: {
      G1(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? Bi(e, t) : Fi(e, t);
      break;
    }
    case a.PLAINTEXT: {
      M1(e, t);
      break;
    }
    case a.COL:
    case a.TH:
    case a.TD:
    case a.TR:
    case a.HEAD:
    case a.FRAME:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.CAPTION:
    case a.COLGROUP:
      break;
    default:
      Fi(e, t);
  }
}
function eE(e, t) {
  if (e.openElements.hasInScope(a.BODY) && (e.insertionMode = m.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const r = e.openElements.tryPeekProperlyNestedBodyElement();
    r && e._setEndLocation(r, t);
  }
}
function tE(e, t) {
  e.openElements.hasInScope(a.BODY) && (e.insertionMode = m.AFTER_BODY, Qo(e, t));
}
function rE(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r));
}
function nE(e) {
  const t = e.openElements.tmplCount > 0, { formElement: r } = e;
  t || (e.formElement = null), (r || t) && e.openElements.hasInScope(a.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(a.FORM) : r && e.openElements.remove(r));
}
function uE(e) {
  e.openElements.hasInButtonScope(a.P) || e._insertFakeElement(b.P, a.P), e._closePElement();
}
function aE(e) {
  e.openElements.hasInListItemScope(a.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(a.LI), e.openElements.popUntilTagNamePopped(a.LI));
}
function iE(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.popUntilTagNamePopped(r));
}
function sE(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function oE(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker());
}
function cE(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(b.BR, a.BR), e.openElements.pop(), e.framesetOk = !1;
}
function Fo(e, t) {
  const r = t.tagName, n = t.tagID;
  for (let u = e.openElements.stackTop; u > 0; u--) {
    const i = e.openElements.items[u], s = e.openElements.tagIDs[u];
    if (n === s && (n !== a.UNKNOWN || e.treeAdapter.getTagName(i) === r)) {
      e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.stackTop >= u && e.openElements.shortenToLength(u);
      break;
    }
    if (e._isSpecialElement(i, s))
      break;
  }
}
function eu(e, t) {
  switch (t.tagID) {
    case a.A:
    case a.B:
    case a.I:
    case a.S:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.NOBR:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      va(e, t);
      break;
    }
    case a.P: {
      uE(e);
      break;
    }
    case a.DL:
    case a.UL:
    case a.OL:
    case a.DIR:
    case a.DIV:
    case a.NAV:
    case a.PRE:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.BUTTON:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.DETAILS:
    case a.SECTION:
    case a.SUMMARY:
    case a.LISTING:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      rE(e, t);
      break;
    }
    case a.LI: {
      aE(e);
      break;
    }
    case a.DD:
    case a.DT: {
      iE(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      sE(e);
      break;
    }
    case a.BR: {
      cE(e);
      break;
    }
    case a.BODY: {
      eE(e, t);
      break;
    }
    case a.HTML: {
      tE(e, t);
      break;
    }
    case a.FORM: {
      nE(e);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      oE(e, t);
      break;
    }
    case a.TEMPLATE: {
      Vt(e, t);
      break;
    }
    default:
      Fo(e, t);
  }
}
function Uo(e, t) {
  e.tmplInsertionModeStack.length > 0 ? Wo(e, t) : xa(e, t);
}
function lE(e, t) {
  var r;
  t.tagID === a.SCRIPT && ((r = e.scriptHandler) === null || r === void 0 || r.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function fE(e, t) {
  e._err(t, A.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function ku(e, t) {
  if (Po.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = m.IN_TABLE_TEXT, t.type) {
      case ie.CHARACTER: {
        Yo(e, t);
        break;
      }
      case ie.WHITESPACE_CHARACTER: {
        Ho(e, t);
        break;
      }
    }
  else
    Jr(e, t);
}
function dE(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, I.HTML), e.insertionMode = m.IN_CAPTION;
}
function hE(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, I.HTML), e.insertionMode = m.IN_COLUMN_GROUP;
}
function EE(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(b.COLGROUP, a.COLGROUP), e.insertionMode = m.IN_COLUMN_GROUP, Ra(e, t);
}
function mE(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, I.HTML), e.insertionMode = m.IN_TABLE_BODY;
}
function TE(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(b.TBODY, a.TBODY), e.insertionMode = m.IN_TABLE_BODY, tu(e, t);
}
function bE(e, t) {
  e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function pE(e, t) {
  Bo(t) ? e._appendElement(t, I.HTML) : Jr(e, t), t.ackSelfClosing = !0;
}
function gE(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, I.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function hr(e, t) {
  switch (t.tagID) {
    case a.TD:
    case a.TH:
    case a.TR: {
      TE(e, t);
      break;
    }
    case a.STYLE:
    case a.SCRIPT:
    case a.TEMPLATE: {
      st(e, t);
      break;
    }
    case a.COL: {
      EE(e, t);
      break;
    }
    case a.FORM: {
      gE(e, t);
      break;
    }
    case a.TABLE: {
      bE(e, t);
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      mE(e, t);
      break;
    }
    case a.INPUT: {
      pE(e, t);
      break;
    }
    case a.CAPTION: {
      dE(e, t);
      break;
    }
    case a.COLGROUP: {
      hE(e, t);
      break;
    }
    default:
      Jr(e, t);
  }
}
function Yr(e, t) {
  switch (t.tagID) {
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      Vt(e, t);
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      Jr(e, t);
  }
}
function Jr(e, t) {
  const r = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, Jn(e, t), e.fosterParentingEnabled = r;
}
function Ho(e, t) {
  e.pendingCharacterTokens.push(t);
}
function Yo(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function xr(e, t) {
  let r = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; r < e.pendingCharacterTokens.length; r++)
      Jr(e, e.pendingCharacterTokens[r]);
  else
    for (; r < e.pendingCharacterTokens.length; r++)
      e._insertCharacters(e.pendingCharacterTokens[r]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const $o = /* @__PURE__ */ new Set([a.CAPTION, a.COL, a.COLGROUP, a.TBODY, a.TD, a.TFOOT, a.TH, a.THEAD, a.TR]);
function _E(e, t) {
  const r = t.tagID;
  $o.has(r) ? e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = m.IN_TABLE, hr(e, t)) : Ue(e, t);
}
function AE(e, t) {
  const r = t.tagID;
  switch (r) {
    case a.CAPTION:
    case a.TABLE: {
      e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = m.IN_TABLE, r === a.TABLE && Yr(e, t));
      break;
    }
    case a.BODY:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      eu(e, t);
  }
}
function Ra(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      Ue(e, t);
      break;
    }
    case a.COL: {
      e._appendElement(t, I.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TEMPLATE: {
      st(e, t);
      break;
    }
    default:
      Mn(e, t);
  }
}
function CE(e, t) {
  switch (t.tagID) {
    case a.COLGROUP: {
      e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = m.IN_TABLE);
      break;
    }
    case a.TEMPLATE: {
      Vt(e, t);
      break;
    }
    case a.COL:
      break;
    default:
      Mn(e, t);
  }
}
function Mn(e, t) {
  e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = m.IN_TABLE, e._processToken(t));
}
function tu(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, I.HTML), e.insertionMode = m.IN_ROW;
      break;
    }
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(b.TR, a.TR), e.insertionMode = m.IN_ROW, ru(e, t);
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = m.IN_TABLE, hr(e, t));
      break;
    }
    default:
      hr(e, t);
  }
}
function zu(e, t) {
  const r = t.tagID;
  switch (t.tagID) {
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasInTableScope(r) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = m.IN_TABLE);
      break;
    }
    case a.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = m.IN_TABLE, Yr(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
    case a.TR:
      break;
    default:
      Yr(e, t);
  }
}
function ru(e, t) {
  switch (t.tagID) {
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, I.HTML), e.insertionMode = m.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = m.IN_TABLE_BODY, tu(e, t));
      break;
    }
    default:
      hr(e, t);
  }
}
function qo(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = m.IN_TABLE_BODY);
      break;
    }
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = m.IN_TABLE_BODY, zu(e, t));
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(a.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = m.IN_TABLE_BODY, zu(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
      break;
    default:
      Yr(e, t);
  }
}
function NE(e, t) {
  const r = t.tagID;
  $o.has(r) ? (e.openElements.hasInTableScope(a.TD) || e.openElements.hasInTableScope(a.TH)) && (e._closeTableCell(), ru(e, t)) : Ue(e, t);
}
function IE(e, t) {
  const r = t.tagID;
  switch (r) {
    case a.TD:
    case a.TH: {
      e.openElements.hasInTableScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = m.IN_ROW);
      break;
    }
    case a.TABLE:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(r) && (e._closeTableCell(), qo(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
      break;
    default:
      eu(e, t);
  }
}
function jo(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      Ue(e, t);
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._insertElement(t, I.HTML);
      break;
    }
    case a.OPTGROUP: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._insertElement(t, I.HTML);
      break;
    }
    case a.INPUT:
    case a.KEYGEN:
    case a.TEXTAREA:
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), t.tagID !== a.SELECT && e._processStartTag(t));
      break;
    }
    case a.SCRIPT:
    case a.TEMPLATE: {
      st(e, t);
      break;
    }
  }
}
function Go(e, t) {
  switch (t.tagID) {
    case a.OPTGROUP: {
      e.openElements.stackTop > 0 && e.openElements.currentTagId === a.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === a.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop();
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop();
      break;
    }
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      Vt(e, t);
      break;
    }
  }
}
function SE(e, t) {
  const r = t.tagID;
  r === a.CAPTION || r === a.TABLE || r === a.TBODY || r === a.TFOOT || r === a.THEAD || r === a.TR || r === a.TD || r === a.TH ? (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : jo(e, t);
}
function yE(e, t) {
  const r = t.tagID;
  r === a.CAPTION || r === a.TABLE || r === a.TBODY || r === a.TFOOT || r === a.THEAD || r === a.TR || r === a.TD || r === a.TH ? e.openElements.hasInTableScope(r) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : Go(e, t);
}
function OE(e, t) {
  switch (t.tagID) {
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      st(e, t);
      break;
    }
    case a.CAPTION:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.tmplInsertionModeStack[0] = m.IN_TABLE, e.insertionMode = m.IN_TABLE, hr(e, t);
      break;
    }
    case a.COL: {
      e.tmplInsertionModeStack[0] = m.IN_COLUMN_GROUP, e.insertionMode = m.IN_COLUMN_GROUP, Ra(e, t);
      break;
    }
    case a.TR: {
      e.tmplInsertionModeStack[0] = m.IN_TABLE_BODY, e.insertionMode = m.IN_TABLE_BODY, tu(e, t);
      break;
    }
    case a.TD:
    case a.TH: {
      e.tmplInsertionModeStack[0] = m.IN_ROW, e.insertionMode = m.IN_ROW, ru(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = m.IN_BODY, e.insertionMode = m.IN_BODY, Ue(e, t);
  }
}
function vE(e, t) {
  t.tagID === a.TEMPLATE && Vt(e, t);
}
function Wo(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : xa(e, t);
}
function xE(e, t) {
  t.tagID === a.HTML ? Ue(e, t) : kn(e, t);
}
function Qo(e, t) {
  var r;
  if (t.tagID === a.HTML) {
    if (e.fragmentContext || (e.insertionMode = m.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === a.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const n = e.openElements.items[1];
      n && !(!((r = e.treeAdapter.getNodeSourceCodeLocation(n)) === null || r === void 0) && r.endTag) && e._setEndLocation(n, t);
    }
  } else
    kn(e, t);
}
function kn(e, t) {
  e.insertionMode = m.IN_BODY, Jn(e, t);
}
function RE(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      Ue(e, t);
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, I.HTML);
      break;
    }
    case a.FRAME: {
      e._appendElement(t, I.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.NOFRAMES: {
      st(e, t);
      break;
    }
  }
}
function LE(e, t) {
  t.tagID === a.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== a.FRAMESET && (e.insertionMode = m.AFTER_FRAMESET));
}
function DE(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      Ue(e, t);
      break;
    }
    case a.NOFRAMES: {
      st(e, t);
      break;
    }
  }
}
function PE(e, t) {
  t.tagID === a.HTML && (e.insertionMode = m.AFTER_AFTER_FRAMESET);
}
function ME(e, t) {
  t.tagID === a.HTML ? Ue(e, t) : Cn(e, t);
}
function Cn(e, t) {
  e.insertionMode = m.IN_BODY, Jn(e, t);
}
function kE(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      Ue(e, t);
      break;
    }
    case a.NOFRAMES: {
      st(e, t);
      break;
    }
  }
}
function wE(e, t) {
  t.chars = _e, e._insertCharacters(t);
}
function BE(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function Vo(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== I.HTML && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function FE(e, t) {
  if (Ro(t))
    Vo(e), e._startTagOutsideForeignContent(t);
  else {
    const r = e._getAdjustedCurrentElement(), n = e.treeAdapter.getNamespaceURI(r);
    n === I.MATHML ? Sa(t) : n === I.SVG && (Lo(t), ya(t)), Zn(t), t.selfClosing ? e._appendElement(t, n) : e._insertElement(t, n), t.ackSelfClosing = !0;
  }
}
function UE(e, t) {
  if (t.tagID === a.P || t.tagID === a.BR) {
    Vo(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let r = e.openElements.stackTop; r > 0; r--) {
    const n = e.openElements.items[r];
    if (e.treeAdapter.getNamespaceURI(n) === I.HTML) {
      e._endTagOutsideForeignContent(t);
      break;
    }
    const u = e.treeAdapter.getTagName(n);
    if (u.toLowerCase() === t.tagName) {
      t.tagName = u, e.openElements.shortenToLength(r);
      break;
    }
  }
}
const HE = /* @__PURE__ */ new Set([
  b.AREA,
  b.BASE,
  b.BASEFONT,
  b.BGSOUND,
  b.BR,
  b.COL,
  b.EMBED,
  b.FRAME,
  b.HR,
  b.IMG,
  b.INPUT,
  b.KEYGEN,
  b.LINK,
  b.META,
  b.PARAM,
  b.SOURCE,
  b.TRACK,
  b.WBR
]);
function Xo(e, t) {
  return t.treeAdapter.isElementNode(e) && t.treeAdapter.getNamespaceURI(e) === I.HTML && HE.has(t.treeAdapter.getTagName(e));
}
const Ko = { treeAdapter: yt, scriptingEnabled: !0 };
function YE(e, t) {
  const r = { ...Ko, ...t };
  return Xo(e, r) ? "" : Zo(e, r);
}
function zo(e, t) {
  const r = { ...Ko, ...t };
  return Jo(e, r);
}
function Zo(e, t) {
  let r = "";
  const n = t.treeAdapter.isElementNode(e) && t.treeAdapter.getTagName(e) === b.TEMPLATE && t.treeAdapter.getNamespaceURI(e) === I.HTML ? t.treeAdapter.getTemplateContent(e) : e, u = t.treeAdapter.getChildNodes(n);
  if (u)
    for (const i of u)
      r += Jo(i, t);
  return r;
}
function Jo(e, t) {
  return t.treeAdapter.isElementNode(e) ? $E(e, t) : t.treeAdapter.isTextNode(e) ? jE(e, t) : t.treeAdapter.isCommentNode(e) ? GE(e, t) : t.treeAdapter.isDocumentTypeNode(e) ? WE(e, t) : "";
}
function $E(e, t) {
  const r = t.treeAdapter.getTagName(e);
  return `<${r}${qE(e, t)}>${Xo(e, t) ? "" : `${Zo(e, t)}</${r}>`}`;
}
function qE(e, { treeAdapter: t }) {
  let r = "";
  for (const n of t.getAttrList(e)) {
    if (r += " ", !n.namespace)
      r += n.name;
    else
      switch (n.namespace) {
        case I.XML: {
          r += `xml:${n.name}`;
          break;
        }
        case I.XMLNS: {
          n.name !== "xmlns" && (r += "xmlns:"), r += n.name;
          break;
        }
        case I.XLINK: {
          r += `xlink:${n.name}`;
          break;
        }
        default:
          r += `${n.prefix}:${n.name}`;
      }
    r += `="${Ps(n.value)}"`;
  }
  return r;
}
function jE(e, t) {
  const { treeAdapter: r } = t, n = r.getTextNodeContent(e), u = r.getParentNode(e), i = u && r.isElementNode(u) && r.getTagName(u);
  return i && r.getNamespaceURI(u) === I.HTML && _o(i, t.scriptingEnabled) ? n : Ms(n);
}
function GE(e, { treeAdapter: t }) {
  return `<!--${t.getCommentNodeContent(e)}-->`;
}
function WE(e, { treeAdapter: t }) {
  return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`;
}
function ec(e, t) {
  return Oa.parse(e, t);
}
function tc(e, t, r) {
  typeof e == "string" && (r = t, t = e, e = null);
  const n = Oa.getFragmentParser(e, r);
  return n.tokenizer.write(t, !0), n.getFragment();
}
const QE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ErrorCodes() {
    return A;
  },
  Parser: Oa,
  Token: vh,
  Tokenizer: Io,
  TokenizerMode: qe,
  defaultTreeAdapter: yt,
  foreignContent: n1,
  html: Lh,
  parse: ec,
  parseFragment: tc,
  serialize: YE,
  serializeOuter: zo
}, Symbol.toStringTag, { value: "Module" })), VE = /* @__PURE__ */ Gt(QE);
function Ui(e) {
  return new ar(e);
}
function Hi(e) {
  const t = e.includes('"') ? "'" : '"';
  return t + e + t;
}
function rc(e, t, r) {
  let n = "!DOCTYPE ";
  return e && (n += e), t ? n += ` PUBLIC ${Hi(t)}` : r && (n += " SYSTEM"), r && (n += ` ${Hi(r)}`), n;
}
const Yt = {
  // Re-exports from domhandler
  isCommentNode: Wr,
  isElementNode: Z,
  isTextNode: nt,
  //Node construction
  createDocument() {
    const e = new xt([]);
    return e["x-mode"] = $e.NO_QUIRKS, e;
  },
  createDocumentFragment() {
    return new xt([]);
  },
  createElement(e, t, r) {
    const n = /* @__PURE__ */ Object.create(null), u = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null);
    for (let c = 0; c < r.length; c++) {
      const l = r[c].name;
      n[l] = r[c].value, u[l] = r[c].namespace, i[l] = r[c].prefix;
    }
    const s = new Gn(e, n, []);
    return s.namespace = t, s["x-attribsNamespace"] = u, s["x-attribsPrefix"] = i, s;
  },
  createCommentNode(e) {
    return new $n(e);
  },
  //Tree mutation
  appendChild(e, t) {
    const r = e.children[e.children.length - 1];
    r && (r.next = t, t.prev = r), e.children.push(t), t.parent = e;
  },
  insertBefore(e, t, r) {
    const n = e.children.indexOf(r), { prev: u } = r;
    u && (u.next = t, t.prev = u), r.prev = t, t.next = r, e.children.splice(n, 0, t), t.parent = e;
  },
  setTemplateContent(e, t) {
    Yt.appendChild(e, t);
  },
  getTemplateContent(e) {
    return e.children[0];
  },
  setDocumentType(e, t, r, n) {
    const u = rc(t, r, n);
    let i = e.children.find((s) => In(s) && s.name === "!doctype");
    i ? i.data = u ?? null : (i = new qn("!doctype", u), Yt.appendChild(e, i)), i["x-name"] = t ?? void 0, i["x-publicId"] = r ?? void 0, i["x-systemId"] = n ?? void 0;
  },
  setDocumentMode(e, t) {
    e["x-mode"] = t;
  },
  getDocumentMode(e) {
    return e["x-mode"];
  },
  detachNode(e) {
    if (e.parent) {
      const t = e.parent.children.indexOf(e), { prev: r, next: n } = e;
      e.prev = null, e.next = null, r && (r.next = n), n && (n.prev = r), e.parent.children.splice(t, 1), e.parent = null;
    }
  },
  insertText(e, t) {
    const r = e.children[e.children.length - 1];
    r && nt(r) ? r.data += t : Yt.appendChild(e, Ui(t));
  },
  insertTextBefore(e, t, r) {
    const n = e.children[e.children.indexOf(r) - 1];
    n && nt(n) ? n.data += t : Yt.insertBefore(e, Ui(t), r);
  },
  adoptAttributes(e, t) {
    for (let r = 0; r < t.length; r++) {
      const n = t[r].name;
      typeof e.attribs[n] > "u" && (e.attribs[n] = t[r].value, e["x-attribsNamespace"][n] = t[r].namespace, e["x-attribsPrefix"][n] = t[r].prefix);
    }
  },
  //Tree traversing
  getFirstChild(e) {
    return e.children[0];
  },
  getChildNodes(e) {
    return e.children;
  },
  getParentNode(e) {
    return e.parent;
  },
  getAttrList(e) {
    return e.attributes;
  },
  //Node data
  getTagName(e) {
    return e.name;
  },
  getNamespaceURI(e) {
    return e.namespace;
  },
  getTextNodeContent(e) {
    return e.data;
  },
  getCommentNodeContent(e) {
    return e.data;
  },
  getDocumentTypeNodeName(e) {
    var t;
    return (t = e["x-name"]) !== null && t !== void 0 ? t : "";
  },
  getDocumentTypeNodePublicId(e) {
    var t;
    return (t = e["x-publicId"]) !== null && t !== void 0 ? t : "";
  },
  getDocumentTypeNodeSystemId(e) {
    var t;
    return (t = e["x-systemId"]) !== null && t !== void 0 ? t : "";
  },
  //Node types
  isDocumentTypeNode(e) {
    return In(e) && e.name === "!doctype";
  },
  // Source code location
  setNodeSourceCodeLocation(e, t) {
    t && (e.startIndex = t.startOffset, e.endIndex = t.endOffset), e.sourceCodeLocation = t;
  },
  getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(e, t) {
    t.endOffset != null && (e.endIndex = t.endOffset), e.sourceCodeLocation = {
      ...e.sourceCodeLocation,
      ...t
    };
  }
}, XE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  adapter: Yt,
  serializeDoctypeContent: rc
}, Symbol.toStringTag, { value: "Module" })), KE = /* @__PURE__ */ Gt(XE);
var zE = q && q.__spreadArray || function(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, u = t.length, i; n < u; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.renderWithParse5 = dr.parseWithParse5 = void 0;
var ZE = cr, Zu = VE, nc = KE;
function JE(e, t, r, n) {
  var u = {
    scriptingEnabled: typeof t.scriptingEnabled == "boolean" ? t.scriptingEnabled : !0,
    treeAdapter: nc.adapter,
    sourceCodeLocationInfo: t.sourceCodeLocationInfo
  };
  return r ? (0, Zu.parse)(e, u) : (0, Zu.parseFragment)(n, e, u);
}
dr.parseWithParse5 = JE;
var em = { treeAdapter: nc.adapter };
function tm(e) {
  for (var t, r = ("length" in e) ? e : [e], n = 0; n < r.length; n += 1) {
    var u = r[n];
    (0, ZE.isDocument)(u) && (t = Array.prototype.splice).call.apply(t, zE([r, n, 1], u.children, !1));
  }
  for (var i = "", n = 0; n < r.length; n += 1) {
    var u = r[n];
    i += (0, Zu.serializeOuter)(u, em);
  }
  return i;
}
dr.renderWithParse5 = tm;
const rm = /* @__PURE__ */ Gt($l);
var H;
(function(e) {
  e[e.Tab = 9] = "Tab", e[e.NewLine = 10] = "NewLine", e[e.FormFeed = 12] = "FormFeed", e[e.CarriageReturn = 13] = "CarriageReturn", e[e.Space = 32] = "Space", e[e.ExclamationMark = 33] = "ExclamationMark", e[e.Number = 35] = "Number", e[e.Amp = 38] = "Amp", e[e.SingleQuote = 39] = "SingleQuote", e[e.DoubleQuote = 34] = "DoubleQuote", e[e.Dash = 45] = "Dash", e[e.Slash = 47] = "Slash", e[e.Zero = 48] = "Zero", e[e.Nine = 57] = "Nine", e[e.Semi = 59] = "Semi", e[e.Lt = 60] = "Lt", e[e.Eq = 61] = "Eq", e[e.Gt = 62] = "Gt", e[e.Questionmark = 63] = "Questionmark", e[e.UpperA = 65] = "UpperA", e[e.LowerA = 97] = "LowerA", e[e.UpperF = 70] = "UpperF", e[e.LowerF = 102] = "LowerF", e[e.UpperZ = 90] = "UpperZ", e[e.LowerZ = 122] = "LowerZ", e[e.LowerX = 120] = "LowerX", e[e.OpeningSquareBracket = 91] = "OpeningSquareBracket";
})(H || (H = {}));
var y;
(function(e) {
  e[e.Text = 1] = "Text", e[e.BeforeTagName = 2] = "BeforeTagName", e[e.InTagName = 3] = "InTagName", e[e.InSelfClosingTag = 4] = "InSelfClosingTag", e[e.BeforeClosingTagName = 5] = "BeforeClosingTagName", e[e.InClosingTagName = 6] = "InClosingTagName", e[e.AfterClosingTagName = 7] = "AfterClosingTagName", e[e.BeforeAttributeName = 8] = "BeforeAttributeName", e[e.InAttributeName = 9] = "InAttributeName", e[e.AfterAttributeName = 10] = "AfterAttributeName", e[e.BeforeAttributeValue = 11] = "BeforeAttributeValue", e[e.InAttributeValueDq = 12] = "InAttributeValueDq", e[e.InAttributeValueSq = 13] = "InAttributeValueSq", e[e.InAttributeValueNq = 14] = "InAttributeValueNq", e[e.BeforeDeclaration = 15] = "BeforeDeclaration", e[e.InDeclaration = 16] = "InDeclaration", e[e.InProcessingInstruction = 17] = "InProcessingInstruction", e[e.BeforeComment = 18] = "BeforeComment", e[e.CDATASequence = 19] = "CDATASequence", e[e.InSpecialComment = 20] = "InSpecialComment", e[e.InCommentLike = 21] = "InCommentLike", e[e.BeforeSpecialS = 22] = "BeforeSpecialS", e[e.SpecialStartSequence = 23] = "SpecialStartSequence", e[e.InSpecialTag = 24] = "InSpecialTag", e[e.BeforeEntity = 25] = "BeforeEntity", e[e.BeforeNumericEntity = 26] = "BeforeNumericEntity", e[e.InNamedEntity = 27] = "InNamedEntity", e[e.InNumericEntity = 28] = "InNumericEntity", e[e.InHexEntity = 29] = "InHexEntity";
})(y || (y = {}));
function pt(e) {
  return e === H.Space || e === H.NewLine || e === H.Tab || e === H.FormFeed || e === H.CarriageReturn;
}
function gn(e) {
  return e === H.Slash || e === H.Gt || pt(e);
}
function Yi(e) {
  return e >= H.Zero && e <= H.Nine;
}
function nm(e) {
  return e >= H.LowerA && e <= H.LowerZ || e >= H.UpperA && e <= H.UpperZ;
}
function um(e) {
  return e >= H.UpperA && e <= H.UpperF || e >= H.LowerA && e <= H.LowerF;
}
var ct;
(function(e) {
  e[e.NoValue = 0] = "NoValue", e[e.Unquoted = 1] = "Unquoted", e[e.Single = 2] = "Single", e[e.Double = 3] = "Double";
})(ct || (ct = {}));
const Ve = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
  // `</title`
};
class uc {
  constructor({ xmlMode: t = !1, decodeEntities: r = !0 }, n) {
    this.cbs = n, this.state = y.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = y.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.trieIndex = 0, this.trieCurrent = 0, this.entityResult = 0, this.entityExcess = 0, this.xmlMode = t, this.decodeEntities = r, this.entityTrie = t ? vs : gt;
  }
  reset() {
    this.state = y.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = y.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
  }
  write(t) {
    this.offset += this.buffer.length, this.buffer = t, this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
  }
  /**
   * The current index within all of the written data.
   */
  getIndex() {
    return this.index;
  }
  /**
   * The start of the current section.
   */
  getSectionStart() {
    return this.sectionStart;
  }
  stateText(t) {
    t === H.Lt || !this.decodeEntities && this.fastForwardTo(H.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = y.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && t === H.Amp && (this.state = y.BeforeEntity);
  }
  stateSpecialStartSequence(t) {
    const r = this.sequenceIndex === this.currentSequence.length;
    if (!(r ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      gn(t)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (t | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.isSpecial = !1;
    else if (!r) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = y.InTagName, this.stateInTagName(t);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === H.Gt || pt(t)) {
        const r = this.index - this.currentSequence.length;
        if (this.sectionStart < r) {
          const n = this.index;
          this.index = r, this.cbs.ontext(this.sectionStart, r), this.index = n;
        }
        this.isSpecial = !1, this.sectionStart = r + 2, this.stateInClosingTagName(t);
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === Ve.TitleEnd ? this.decodeEntities && t === H.Amp && (this.state = y.BeforeEntity) : this.fastForwardTo(H.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === H.Lt);
  }
  stateCDATASequence(t) {
    t === Ve.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === Ve.Cdata.length && (this.state = y.InCommentLike, this.currentSequence = Ve.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = y.InDeclaration, this.stateInDeclaration(t));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length + this.offset; )
      if (this.buffer.charCodeAt(this.index - this.offset) === t)
        return !0;
    return this.index = this.buffer.length + this.offset - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === Ve.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = y.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(t) {
    return this.xmlMode ? !gn(t) : nm(t);
  }
  startSpecial(t, r) {
    this.isSpecial = !0, this.currentSequence = t, this.sequenceIndex = r, this.state = y.SpecialStartSequence;
  }
  stateBeforeTagName(t) {
    if (t === H.ExclamationMark)
      this.state = y.BeforeDeclaration, this.sectionStart = this.index + 1;
    else if (t === H.Questionmark)
      this.state = y.InProcessingInstruction, this.sectionStart = this.index + 1;
    else if (this.isTagStartChar(t)) {
      const r = t | 32;
      this.sectionStart = this.index, !this.xmlMode && r === Ve.TitleEnd[2] ? this.startSpecial(Ve.TitleEnd, 3) : this.state = !this.xmlMode && r === Ve.ScriptEnd[2] ? y.BeforeSpecialS : y.InTagName;
    } else
      t === H.Slash ? this.state = y.BeforeClosingTagName : (this.state = y.Text, this.stateText(t));
  }
  stateInTagName(t) {
    gn(t) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = y.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateBeforeClosingTagName(t) {
    pt(t) || (t === H.Gt ? this.state = y.Text : (this.state = this.isTagStartChar(t) ? y.InClosingTagName : y.InSpecialComment, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === H.Gt || pt(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = y.AfterClosingTagName, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    (t === H.Gt || this.fastForwardTo(H.Gt)) && (this.state = y.Text, this.baseState = y.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeAttributeName(t) {
    t === H.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = y.InSpecialTag, this.sequenceIndex = 0) : this.state = y.Text, this.baseState = this.state, this.sectionStart = this.index + 1) : t === H.Slash ? this.state = y.InSelfClosingTag : pt(t) || (this.state = y.InAttributeName, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === H.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = y.Text, this.baseState = y.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : pt(t) || (this.state = y.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateInAttributeName(t) {
    (t === H.Eq || gn(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = -1, this.state = y.AfterAttributeName, this.stateAfterAttributeName(t));
  }
  stateAfterAttributeName(t) {
    t === H.Eq ? this.state = y.BeforeAttributeValue : t === H.Slash || t === H.Gt ? (this.cbs.onattribend(ct.NoValue, this.index), this.state = y.BeforeAttributeName, this.stateBeforeAttributeName(t)) : pt(t) || (this.cbs.onattribend(ct.NoValue, this.index), this.state = y.InAttributeName, this.sectionStart = this.index);
  }
  stateBeforeAttributeValue(t) {
    t === H.DoubleQuote ? (this.state = y.InAttributeValueDq, this.sectionStart = this.index + 1) : t === H.SingleQuote ? (this.state = y.InAttributeValueSq, this.sectionStart = this.index + 1) : pt(t) || (this.sectionStart = this.index, this.state = y.InAttributeValueNq, this.stateInAttributeValueNoQuotes(t));
  }
  handleInAttributeValue(t, r) {
    t === r || !this.decodeEntities && this.fastForwardTo(r) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(r === H.DoubleQuote ? ct.Double : ct.Single, this.index), this.state = y.BeforeAttributeName) : this.decodeEntities && t === H.Amp && (this.baseState = this.state, this.state = y.BeforeEntity);
  }
  stateInAttributeValueDoubleQuotes(t) {
    this.handleInAttributeValue(t, H.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(t) {
    this.handleInAttributeValue(t, H.SingleQuote);
  }
  stateInAttributeValueNoQuotes(t) {
    pt(t) || t === H.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(ct.Unquoted, this.index), this.state = y.BeforeAttributeName, this.stateBeforeAttributeName(t)) : this.decodeEntities && t === H.Amp && (this.baseState = this.state, this.state = y.BeforeEntity);
  }
  stateBeforeDeclaration(t) {
    t === H.OpeningSquareBracket ? (this.state = y.CDATASequence, this.sequenceIndex = 0) : this.state = t === H.Dash ? y.BeforeComment : y.InDeclaration;
  }
  stateInDeclaration(t) {
    (t === H.Gt || this.fastForwardTo(H.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = y.Text, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === H.Gt || this.fastForwardTo(H.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = y.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === H.Dash ? (this.state = y.InCommentLike, this.currentSequence = Ve.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = y.InDeclaration;
  }
  stateInSpecialComment(t) {
    (t === H.Gt || this.fastForwardTo(H.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = y.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    const r = t | 32;
    r === Ve.ScriptEnd[3] ? this.startSpecial(Ve.ScriptEnd, 4) : r === Ve.StyleEnd[3] ? this.startSpecial(Ve.StyleEnd, 4) : (this.state = y.InTagName, this.stateInTagName(t));
  }
  stateBeforeEntity(t) {
    this.entityExcess = 1, this.entityResult = 0, t === H.Number ? this.state = y.BeforeNumericEntity : t === H.Amp || (this.trieIndex = 0, this.trieCurrent = this.entityTrie[0], this.state = y.InNamedEntity, this.stateInNamedEntity(t));
  }
  stateInNamedEntity(t) {
    if (this.entityExcess += 1, this.trieIndex = ia(this.entityTrie, this.trieCurrent, this.trieIndex + 1, t), this.trieIndex < 0) {
      this.emitNamedEntity(), this.index--;
      return;
    }
    this.trieCurrent = this.entityTrie[this.trieIndex];
    const r = this.trieCurrent & ze.VALUE_LENGTH;
    if (r) {
      const n = (r >> 14) - 1;
      if (!this.allowLegacyEntity() && t !== H.Semi)
        this.trieIndex += n;
      else {
        const u = this.index - this.entityExcess + 1;
        u > this.sectionStart && this.emitPartial(this.sectionStart, u), this.entityResult = this.trieIndex, this.trieIndex += n, this.entityExcess = 0, this.sectionStart = this.index + 1, n === 0 && this.emitNamedEntity();
      }
    }
  }
  emitNamedEntity() {
    if (this.state = this.baseState, this.entityResult === 0)
      return;
    switch ((this.entityTrie[this.entityResult] & ze.VALUE_LENGTH) >> 14) {
      case 1: {
        this.emitCodePoint(this.entityTrie[this.entityResult] & ~ze.VALUE_LENGTH);
        break;
      }
      case 2: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        break;
      }
      case 3:
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]), this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
    }
  }
  stateBeforeNumericEntity(t) {
    (t | 32) === H.LowerX ? (this.entityExcess++, this.state = y.InHexEntity) : (this.state = y.InNumericEntity, this.stateInNumericEntity(t));
  }
  emitNumericEntity(t) {
    const r = this.index - this.entityExcess - 1;
    r + 2 + +(this.state === y.InHexEntity) !== this.index && (r > this.sectionStart && this.emitPartial(this.sectionStart, r), this.sectionStart = this.index + Number(t), this.emitCodePoint(xs(this.entityResult))), this.state = this.baseState;
  }
  stateInNumericEntity(t) {
    t === H.Semi ? this.emitNumericEntity(!0) : Yi(t) ? (this.entityResult = this.entityResult * 10 + (t - H.Zero), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
  }
  stateInHexEntity(t) {
    t === H.Semi ? this.emitNumericEntity(!0) : Yi(t) ? (this.entityResult = this.entityResult * 16 + (t - H.Zero), this.entityExcess++) : um(t) ? (this.entityResult = this.entityResult * 16 + ((t | 32) - H.LowerA + 10), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
  }
  allowLegacyEntity() {
    return !this.xmlMode && (this.baseState === y.Text || this.baseState === y.InSpecialTag);
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.running && this.sectionStart !== this.index && (this.state === y.Text || this.state === y.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === y.InAttributeValueDq || this.state === y.InAttributeValueSq || this.state === y.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    for (; this.shouldContinue(); ) {
      const t = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case y.Text: {
          this.stateText(t);
          break;
        }
        case y.SpecialStartSequence: {
          this.stateSpecialStartSequence(t);
          break;
        }
        case y.InSpecialTag: {
          this.stateInSpecialTag(t);
          break;
        }
        case y.CDATASequence: {
          this.stateCDATASequence(t);
          break;
        }
        case y.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(t);
          break;
        }
        case y.InAttributeName: {
          this.stateInAttributeName(t);
          break;
        }
        case y.InCommentLike: {
          this.stateInCommentLike(t);
          break;
        }
        case y.InSpecialComment: {
          this.stateInSpecialComment(t);
          break;
        }
        case y.BeforeAttributeName: {
          this.stateBeforeAttributeName(t);
          break;
        }
        case y.InTagName: {
          this.stateInTagName(t);
          break;
        }
        case y.InClosingTagName: {
          this.stateInClosingTagName(t);
          break;
        }
        case y.BeforeTagName: {
          this.stateBeforeTagName(t);
          break;
        }
        case y.AfterAttributeName: {
          this.stateAfterAttributeName(t);
          break;
        }
        case y.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(t);
          break;
        }
        case y.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(t);
          break;
        }
        case y.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(t);
          break;
        }
        case y.AfterClosingTagName: {
          this.stateAfterClosingTagName(t);
          break;
        }
        case y.BeforeSpecialS: {
          this.stateBeforeSpecialS(t);
          break;
        }
        case y.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(t);
          break;
        }
        case y.InSelfClosingTag: {
          this.stateInSelfClosingTag(t);
          break;
        }
        case y.InDeclaration: {
          this.stateInDeclaration(t);
          break;
        }
        case y.BeforeDeclaration: {
          this.stateBeforeDeclaration(t);
          break;
        }
        case y.BeforeComment: {
          this.stateBeforeComment(t);
          break;
        }
        case y.InProcessingInstruction: {
          this.stateInProcessingInstruction(t);
          break;
        }
        case y.InNamedEntity: {
          this.stateInNamedEntity(t);
          break;
        }
        case y.BeforeEntity: {
          this.stateBeforeEntity(t);
          break;
        }
        case y.InHexEntity: {
          this.stateInHexEntity(t);
          break;
        }
        case y.InNumericEntity: {
          this.stateInNumericEntity(t);
          break;
        }
        default:
          this.stateBeforeNumericEntity(t);
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === y.InNamedEntity && this.emitNamedEntity(), this.sectionStart < this.index && this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length + this.offset;
    this.state === y.InCommentLike ? this.currentSequence === Ve.CdataEnd ? this.cbs.oncdata(this.sectionStart, t, 0) : this.cbs.oncomment(this.sectionStart, t, 0) : this.state === y.InNumericEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === y.InHexEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === y.InTagName || this.state === y.BeforeAttributeName || this.state === y.BeforeAttributeValue || this.state === y.AfterAttributeName || this.state === y.InAttributeName || this.state === y.InAttributeValueSq || this.state === y.InAttributeValueDq || this.state === y.InAttributeValueNq || this.state === y.InClosingTagName || this.cbs.ontext(this.sectionStart, t);
  }
  emitPartial(t, r) {
    this.baseState !== y.Text && this.baseState !== y.InSpecialTag ? this.cbs.onattribdata(t, r) : this.cbs.ontext(t, r);
  }
  emitCodePoint(t) {
    this.baseState !== y.Text && this.baseState !== y.InSpecialTag ? this.cbs.onattribentity(t) : this.cbs.ontextentity(t);
  }
}
const Zt = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), Ee = /* @__PURE__ */ new Set(["p"]), $i = /* @__PURE__ */ new Set(["thead", "tbody"]), qi = /* @__PURE__ */ new Set(["dd", "dt"]), ji = /* @__PURE__ */ new Set(["rt", "rp"]), am = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", Ee],
  ["h1", Ee],
  ["h2", Ee],
  ["h3", Ee],
  ["h4", Ee],
  ["h5", Ee],
  ["h6", Ee],
  ["select", Zt],
  ["input", Zt],
  ["output", Zt],
  ["button", Zt],
  ["datalist", Zt],
  ["textarea", Zt],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", qi],
  ["dt", qi],
  ["address", Ee],
  ["article", Ee],
  ["aside", Ee],
  ["blockquote", Ee],
  ["details", Ee],
  ["div", Ee],
  ["dl", Ee],
  ["fieldset", Ee],
  ["figcaption", Ee],
  ["figure", Ee],
  ["footer", Ee],
  ["form", Ee],
  ["header", Ee],
  ["hr", Ee],
  ["main", Ee],
  ["nav", Ee],
  ["ol", Ee],
  ["pre", Ee],
  ["section", Ee],
  ["table", Ee],
  ["ul", Ee],
  ["rt", ji],
  ["rp", ji],
  ["tbody", $i],
  ["tfoot", $i]
]), im = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]), Gi = /* @__PURE__ */ new Set(["math", "svg"]), Wi = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]), sm = /\s|\//;
class La {
  constructor(t, r = {}) {
    var n, u, i, s, c;
    this.options = r, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.foreignContext = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = t ?? {}, this.lowerCaseTagNames = (n = r.lowerCaseTags) !== null && n !== void 0 ? n : !r.xmlMode, this.lowerCaseAttributeNames = (u = r.lowerCaseAttributeNames) !== null && u !== void 0 ? u : !r.xmlMode, this.tokenizer = new ((i = r.Tokenizer) !== null && i !== void 0 ? i : uc)(this.options, this), (c = (s = this.cbs).onparserinit) === null || c === void 0 || c.call(s, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(t, r) {
    var n, u;
    const i = this.getSlice(t, r);
    this.endIndex = r - 1, (u = (n = this.cbs).ontext) === null || u === void 0 || u.call(n, i), this.startIndex = r;
  }
  /** @internal */
  ontextentity(t) {
    var r, n;
    const u = this.tokenizer.getSectionStart();
    this.endIndex = u - 1, (n = (r = this.cbs).ontext) === null || n === void 0 || n.call(r, Hu(t)), this.startIndex = u;
  }
  isVoidElement(t) {
    return !this.options.xmlMode && im.has(t);
  }
  /** @internal */
  onopentagname(t, r) {
    this.endIndex = r;
    let n = this.getSlice(t, r);
    this.lowerCaseTagNames && (n = n.toLowerCase()), this.emitOpenTag(n);
  }
  emitOpenTag(t) {
    var r, n, u, i;
    this.openTagStart = this.startIndex, this.tagname = t;
    const s = !this.options.xmlMode && am.get(t);
    if (s)
      for (; this.stack.length > 0 && s.has(this.stack[this.stack.length - 1]); ) {
        const c = this.stack.pop();
        (n = (r = this.cbs).onclosetag) === null || n === void 0 || n.call(r, c, !0);
      }
    this.isVoidElement(t) || (this.stack.push(t), Gi.has(t) ? this.foreignContext.push(!0) : Wi.has(t) && this.foreignContext.push(!1)), (i = (u = this.cbs).onopentagname) === null || i === void 0 || i.call(u, t), this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(t) {
    var r, n;
    this.startIndex = this.openTagStart, this.attribs && ((n = (r = this.cbs).onopentag) === null || n === void 0 || n.call(r, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
  }
  /** @internal */
  onopentagend(t) {
    this.endIndex = t, this.endOpenTag(!1), this.startIndex = t + 1;
  }
  /** @internal */
  onclosetag(t, r) {
    var n, u, i, s, c, l;
    this.endIndex = r;
    let h = this.getSlice(t, r);
    if (this.lowerCaseTagNames && (h = h.toLowerCase()), (Gi.has(h) || Wi.has(h)) && this.foreignContext.pop(), this.isVoidElement(h))
      !this.options.xmlMode && h === "br" && ((u = (n = this.cbs).onopentagname) === null || u === void 0 || u.call(n, "br"), (s = (i = this.cbs).onopentag) === null || s === void 0 || s.call(i, "br", {}, !0), (l = (c = this.cbs).onclosetag) === null || l === void 0 || l.call(c, "br", !1));
    else {
      const T = this.stack.lastIndexOf(h);
      if (T !== -1)
        if (this.cbs.onclosetag) {
          let _ = this.stack.length - T;
          for (; _--; )
            this.cbs.onclosetag(this.stack.pop(), _ !== 0);
        } else
          this.stack.length = T;
      else
        !this.options.xmlMode && h === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    }
    this.startIndex = r + 1;
  }
  /** @internal */
  onselfclosingtag(t) {
    this.endIndex = t, this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? (this.closeCurrentTag(!1), this.startIndex = t + 1) : this.onopentagend(t);
  }
  closeCurrentTag(t) {
    var r, n;
    const u = this.tagname;
    this.endOpenTag(t), this.stack[this.stack.length - 1] === u && ((n = (r = this.cbs).onclosetag) === null || n === void 0 || n.call(r, u, !t), this.stack.pop());
  }
  /** @internal */
  onattribname(t, r) {
    this.startIndex = t;
    const n = this.getSlice(t, r);
    this.attribname = this.lowerCaseAttributeNames ? n.toLowerCase() : n;
  }
  /** @internal */
  onattribdata(t, r) {
    this.attribvalue += this.getSlice(t, r);
  }
  /** @internal */
  onattribentity(t) {
    this.attribvalue += Hu(t);
  }
  /** @internal */
  onattribend(t, r) {
    var n, u;
    this.endIndex = r, (u = (n = this.cbs).onattribute) === null || u === void 0 || u.call(n, this.attribname, this.attribvalue, t === ct.Double ? '"' : t === ct.Single ? "'" : t === ct.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
  }
  getInstructionName(t) {
    const r = t.search(sm);
    let n = r < 0 ? t : t.substr(0, r);
    return this.lowerCaseTagNames && (n = n.toLowerCase()), n;
  }
  /** @internal */
  ondeclaration(t, r) {
    this.endIndex = r;
    const n = this.getSlice(t, r);
    if (this.cbs.onprocessinginstruction) {
      const u = this.getInstructionName(n);
      this.cbs.onprocessinginstruction(`!${u}`, `!${n}`);
    }
    this.startIndex = r + 1;
  }
  /** @internal */
  onprocessinginstruction(t, r) {
    this.endIndex = r;
    const n = this.getSlice(t, r);
    if (this.cbs.onprocessinginstruction) {
      const u = this.getInstructionName(n);
      this.cbs.onprocessinginstruction(`?${u}`, `?${n}`);
    }
    this.startIndex = r + 1;
  }
  /** @internal */
  oncomment(t, r, n) {
    var u, i, s, c;
    this.endIndex = r, (i = (u = this.cbs).oncomment) === null || i === void 0 || i.call(u, this.getSlice(t, r - n)), (c = (s = this.cbs).oncommentend) === null || c === void 0 || c.call(s), this.startIndex = r + 1;
  }
  /** @internal */
  oncdata(t, r, n) {
    var u, i, s, c, l, h, T, _, C, p;
    this.endIndex = r;
    const g = this.getSlice(t, r - n);
    this.options.xmlMode || this.options.recognizeCDATA ? ((i = (u = this.cbs).oncdatastart) === null || i === void 0 || i.call(u), (c = (s = this.cbs).ontext) === null || c === void 0 || c.call(s, g), (h = (l = this.cbs).oncdataend) === null || h === void 0 || h.call(l)) : ((_ = (T = this.cbs).oncomment) === null || _ === void 0 || _.call(T, `[CDATA[${g}]]`), (p = (C = this.cbs).oncommentend) === null || p === void 0 || p.call(C)), this.startIndex = r + 1;
  }
  /** @internal */
  onend() {
    var t, r;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let n = this.stack.length; n > 0; this.cbs.onclosetag(this.stack[--n], !0))
        ;
    }
    (r = (t = this.cbs).onend) === null || r === void 0 || r.call(t);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var t, r, n, u;
    (r = (t = this.cbs).onreset) === null || r === void 0 || r.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (u = (n = this.cbs).onparserinit) === null || u === void 0 || u.call(n, this), this.buffers.length = 0, this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(t) {
    this.reset(), this.end(t);
  }
  getSlice(t, r) {
    for (; t - this.bufferOffset >= this.buffers[0].length; )
      this.shiftBuffer();
    let n = this.buffers[0].slice(t - this.bufferOffset, r - this.bufferOffset);
    for (; r - this.bufferOffset > this.buffers[0].length; )
      this.shiftBuffer(), n += this.buffers[0].slice(0, r - this.bufferOffset);
    return n;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(t) {
    var r, n;
    if (this.ended) {
      (n = (r = this.cbs).onerror) === null || n === void 0 || n.call(r, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++);
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(t) {
    var r, n;
    if (this.ended) {
      (n = (r = this.cbs).onerror) === null || n === void 0 || n.call(r, new Error(".end() after done!"));
      return;
    }
    t && this.write(t), this.ended = !0, this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(t) {
    this.write(t);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(t) {
    this.end(t);
  }
}
function Da(e, t) {
  const r = new ir(void 0, t);
  return new La(r, t).end(e), r.root;
}
function ac(e, t) {
  return Da(e, t).children;
}
function om(e, t, r) {
  const n = new ir(e, t, r);
  return new La(n, t);
}
const cm = { xmlMode: !0 };
function lm(e, t = cm) {
  return fa(ac(e, t));
}
const fm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DefaultHandler: ir,
  DomHandler: ir,
  DomUtils: pr,
  ElementType: gl,
  Parser: La,
  Tokenizer: uc,
  createDomStream: om,
  getFeed: fa,
  parseDOM: ac,
  parseDocument: Da,
  parseFeed: lm
}, Symbol.toStringTag, { value: "Module" })), dm = /* @__PURE__ */ Gt(fm);
(function(e) {
  var t = q && q.__createBinding || (Object.create ? function(g, O, M, Y) {
    Y === void 0 && (Y = M);
    var W = Object.getOwnPropertyDescriptor(O, M);
    (!W || ("get" in W ? !O.__esModule : W.writable || W.configurable)) && (W = { enumerable: !0, get: function() {
      return O[M];
    } }), Object.defineProperty(g, Y, W);
  } : function(g, O, M, Y) {
    Y === void 0 && (Y = M), g[Y] = O[M];
  }), r = q && q.__setModuleDefault || (Object.create ? function(g, O) {
    Object.defineProperty(g, "default", { enumerable: !0, value: O });
  } : function(g, O) {
    g.default = O;
  }), n = q && q.__exportStar || function(g, O) {
    for (var M in g)
      M !== "default" && !Object.prototype.hasOwnProperty.call(O, M) && t(O, g, M);
  }, u = q && q.__importStar || function(g) {
    if (g && g.__esModule)
      return g;
    var O = {};
    if (g != null)
      for (var M in g)
        M !== "default" && Object.prototype.hasOwnProperty.call(g, M) && t(O, g, M);
    return r(O, g), O;
  }, i = q && q.__importDefault || function(g) {
    return g && g.__esModule ? g : { default: g };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.root = e.parseHTML = e.merge = e.contains = e.text = e.xml = e.html = e.load = void 0, n(bs, e);
  var s = Hn, c = qt, l = dr, h = i(rm), T = dm, _ = (0, c.getParse)(function(g, O, M, Y) {
    return O.xmlMode || O._useHtmlParser2 ? (0, T.parseDocument)(g, O) : (0, l.parseWithParse5)(g, O, M, Y);
  });
  e.load = (0, s.getLoad)(_, function(g, O) {
    return O.xmlMode || O._useHtmlParser2 ? (0, h.default)(g, O) : (0, l.renderWithParse5)(g);
  }), e.default = (0, e.load)([]);
  var C = Ie;
  Object.defineProperty(e, "html", { enumerable: !0, get: function() {
    return C.html;
  } }), Object.defineProperty(e, "xml", { enumerable: !0, get: function() {
    return C.xml;
  } }), Object.defineProperty(e, "text", { enumerable: !0, get: function() {
    return C.text;
  } });
  var p = u(Ie);
  e.contains = p.contains, e.merge = p.merge, e.parseHTML = p.parseHTML, e.root = p.root;
})(Ts);
var wu = {}, ic = { exports: {} }, sc = { exports: {} };
(function(e, t) {
  e.exports = r;
  function r(u) {
    return n.bind(null, u);
  }
  function n(u) {
    var i = [].slice.call(arguments, 1);
    i.unshift("[" + u + "]"), process.stderr.write(i.join(" ") + `
`);
  }
})(sc);
var Pa = sc.exports;
(function(e, t) {
  Pa("lex"), e.exports = r;
  function r(n) {
    var u = "", i, s = 0, c = -1, l = 0, h = 1, T = "before-selector", _ = [T], C = {}, p = [], g = [
      "media",
      "keyframes",
      { name: "-webkit-keyframes", type: "keyframes", prefix: "-webkit-" },
      { name: "-moz-keyframes", type: "keyframes", prefix: "-moz-" },
      { name: "-ms-keyframes", type: "keyframes", prefix: "-ms-" },
      { name: "-o-keyframes", type: "keyframes", prefix: "-o-" },
      "font-face",
      { name: "import", state: "before-at-value" },
      { name: "charset", state: "before-at-value" },
      "supports",
      "viewport",
      { name: "namespace", state: "before-at-value" },
      "document",
      { name: "-moz-document", type: "document", prefix: "-moz-" },
      "page"
    ];
    function O() {
      return ue(), n[c];
    }
    function M(re) {
      return re ? _[_.length - 1 - re] : T;
    }
    function Y(re) {
      var S = c + 1;
      return re === n.slice(S, S + re.length);
    }
    function W(re) {
      var S = n.slice(c).indexOf(re);
      return S > 0 ? S : !1;
    }
    function Q(re) {
      return re === k(1);
    }
    function k(re) {
      return n[c + (re || 1)];
    }
    function R() {
      var re = _.pop();
      return T = _[_.length - 1], re;
    }
    function w(re) {
      return T = re, _.push(T), _.length;
    }
    function V(re) {
      var S = T;
      return _[_.length - 1] = T = re, S;
    }
    function ue(re) {
      if ((re || 1) == 1)
        n[c] == `
` ? (h++, s = 1) : s++, c++;
      else {
        var S = n.slice(c, c + re).split(`
`);
        S.length > 1 && (h += S.length - 1, s = 1), s += S[S.length - 1].length, c = c + re;
      }
    }
    function oe() {
      C.end = {
        line: h,
        col: s
      }, p.push(C), u = "", C = {};
    }
    function Te(re) {
      C = {
        type: re,
        start: {
          line: h,
          col: s
        }
      };
    }
    for (; i = O(); )
      switch (i) {
        case " ":
          switch (M()) {
            case "selector":
            case "value":
            case "value-paren":
            case "at-group":
            case "at-value":
            case "comment":
            case "double-string":
            case "single-string":
              u += i;
              break;
          }
          break;
        case `
`:
        case "	":
        case "\r":
        case "\f":
          switch (M()) {
            case "value":
            case "value-paren":
            case "at-group":
            case "comment":
            case "single-string":
            case "double-string":
            case "selector":
              u += i;
              break;
            case "at-value":
              i === `
` && (C.value = u.trim(), oe(), R());
              break;
          }
          break;
        case ":":
          switch (M()) {
            case "name":
              C.name = u.trim(), u = "", V("before-value");
              break;
            case "before-selector":
              u += i, Te("selector"), w("selector");
              break;
            case "before-value":
              V("value"), u += i;
              break;
            default:
              u += i;
              break;
          }
          break;
        case ";":
          switch (M()) {
            case "name":
            case "before-value":
            case "value":
              u.trim().length > 0 && (C.value = u.trim(), oe()), V("before-name");
              break;
            case "value-paren":
              u += i;
              break;
            case "at-value":
              C.value = u.trim(), oe(), R();
              break;
            case "before-name":
              break;
            default:
              u += i;
              break;
          }
          break;
        case "{":
          switch (M()) {
            case "selector":
              if (k(-1) === "\\") {
                u += i;
                break;
              }
              C.text = u.trim(), oe(), V("before-name"), l = l + 1;
              break;
            case "at-group":
              switch (C.name = u.trim(), C.type) {
                case "font-face":
                case "viewport":
                case "page":
                  w("before-name");
                  break;
                default:
                  w("before-selector");
              }
              oe(), l = l + 1;
              break;
            case "name":
            case "at-rule":
              C.name = u.trim(), oe(), w("before-name"), l = l + 1;
              break;
            case "comment":
            case "double-string":
            case "single-string":
              u += i;
              break;
            case "before-value":
              V("value"), u += i;
              break;
          }
          break;
        case "}":
          switch (M()) {
            case "before-name":
            case "name":
            case "before-value":
            case "value":
              u && (C.value = u.trim()), C.name && C.value && oe(), Te("end"), oe(), R(), M() === "at-group" && (Te("at-group-end"), oe(), R()), l > 0 && (l = l - 1);
              break;
            case "at-group":
            case "before-selector":
            case "selector":
              if (k(-1) === "\\") {
                u += i;
                break;
              }
              l > 0 && M(1) === "at-group" && (Te("at-group-end"), oe()), l > 1 && R(), l > 0 && (l = l - 1);
              break;
            case "double-string":
            case "single-string":
            case "comment":
              u += i;
              break;
          }
          break;
        case '"':
        case "'":
          switch (M()) {
            case "double-string":
              i === '"' && k(-1) !== "\\" && R();
              break;
            case "single-string":
              i === "'" && k(-1) !== "\\" && R();
              break;
            case "before-at-value":
              V("at-value"), w(i === '"' ? "double-string" : "single-string");
              break;
            case "before-value":
              V("value"), w(i === '"' ? "double-string" : "single-string");
              break;
            case "comment":
              break;
            default:
              k(-1) !== "\\" && w(i === '"' ? "double-string" : "single-string");
          }
          u += i;
          break;
        case "/":
          switch (M()) {
            case "comment":
            case "double-string":
            case "single-string":
              u += i;
              break;
            case "before-value":
            case "selector":
            case "name":
            case "value":
              if (Q("*")) {
                var Ze = W("*/");
                Ze && ue(Ze + 1);
              } else
                M() == "before-value" && V("value"), u += i;
              break;
            default:
              Q("*") ? (Te("comment"), w("comment"), ue()) : u += i;
              break;
          }
          break;
        case "*":
          switch (M()) {
            case "comment":
              Q("/") ? (C.text = u, ue(), oe(), R()) : u += i;
              break;
            case "before-selector":
              u += i, Te("selector"), w("selector");
              break;
            case "before-value":
              V("value"), u += i;
              break;
            default:
              u += i;
          }
          break;
        case "@":
          switch (M()) {
            case "comment":
            case "double-string":
            case "single-string":
              u += i;
              break;
            case "before-value":
              V("value"), u += i;
              break;
            default:
              for (var z = !1, me, ge, de = 0, se = g.length; !z && de < se; ++de)
                ge = g[de], me = ge.name || ge, Y(me) && (z = !0, Te(me), w(ge.state || "at-group"), ue(me.length), ge.prefix && (C.prefix = ge.prefix), ge.type && (C.type = ge.type));
              z || (u += i);
              break;
          }
          break;
        case "(":
          switch (M()) {
            case "value":
              w("value-paren");
              break;
            case "before-value":
              V("value");
              break;
          }
          u += i;
          break;
        case ")":
          switch (M()) {
            case "value-paren":
              R();
              break;
            case "before-value":
              V("value");
              break;
          }
          u += i;
          break;
        default:
          switch (M()) {
            case "before-selector":
              Te("selector"), w("selector");
              break;
            case "before-name":
              Te("property"), V("name");
              break;
            case "before-value":
              V("value");
              break;
            case "before-at-value":
              V("at-value");
              break;
          }
          u += i;
          break;
      }
    return p;
  }
})(ic);
var oc = ic.exports, cc = { exports: {} };
(function(e, t) {
  Pa("parse");
  var r = oc;
  e.exports = c;
  var n, u, i, s;
  function c(R, w) {
    w || (w = {}), n = !!w.comments, i = !!w.position, u = 0, s = Array.isArray(R) ? R.slice() : r(R);
    for (var V, ue = [], oe; oe = h(); )
      V = Y(oe), V && ue.push(V);
    return {
      type: "stylesheet",
      stylesheet: {
        rules: ue
      }
    };
  }
  function l(R, w) {
    w || (w = {});
    for (var V, ue = ["type", "name", "value"], oe = {}, Te = 0; Te < ue.length; ++Te)
      V = ue[Te], R[V] && (oe[V] = w[V] || R[V]);
    for (ue = Object.keys(w), Te = 0; Te < ue.length; ++Te)
      V = ue[Te], oe[V] || (oe[V] = w[V]);
    return i && (oe.position = {
      start: R.start,
      end: R.end
    }), oe;
  }
  function h() {
    var R = s.shift();
    return R;
  }
  function T(R) {
    u = u + 1;
    var w = {};
    switch (R.type) {
      case "font-face":
      case "viewport":
        w.declarations = Q();
        break;
      case "page":
        w.prefix = R.prefix, w.declarations = Q();
        break;
      default:
        w.prefix = R.prefix, w.rules = k();
    }
    return l(R, w);
  }
  function _(R) {
    return l(R);
  }
  function C(R) {
    return l(R);
  }
  function p(R) {
    return l(R, { text: R.text });
  }
  function g(R) {
    return l(R);
  }
  function O(R) {
    return l(R);
  }
  function M(R) {
    function w(V) {
      return V.trim();
    }
    return l(R, {
      type: "rule",
      selectors: R.text.split(",").map(w),
      declarations: Q()
    });
  }
  function Y(R) {
    switch (R.type) {
      case "property":
        return O(R);
      case "selector":
        return M(R);
      case "at-group-end":
        u = u - 1;
        return;
      case "media":
      case "keyframes":
        return T(R);
      case "comment":
        if (n)
          return p(R);
        break;
      case "charset":
        return C(R);
      case "import":
        return _(R);
      case "namespace":
        return g(R);
      case "font-face":
      case "supports":
      case "viewport":
      case "document":
      case "page":
        return T(R);
    }
  }
  function W(R) {
    for (var w, V = [], ue; (ue = h()) && R && R(ue); )
      w = Y(ue), w && V.push(w);
    return ue && ue.type !== "end" && s.unshift(ue), V;
  }
  function Q() {
    return W(function(R) {
      return R.type === "property" || R.type === "comment";
    });
  }
  function k() {
    return W(function() {
      return u;
    });
  }
})(cc);
var hm = cc.exports, lc = { exports: {} };
(function(e, t) {
  Pa("stringify");
  var r, n, u, i, s, c;
  e.exports = l;
  function l(k, R) {
    R || (R = {}), u = R.indentation || "", n = !!R.compress, r = !!R.comments, i = 1, n ? s = c = "" : (s = `
`, c = " ");
    var w = g(k.stylesheet.rules, W).join(`
`).trim();
    return w;
  }
  function h(k) {
    if (k) {
      i += k;
      return;
    }
    return n ? "" : Array(i).join(u || "");
  }
  function T(k) {
    return "@" + k.type + " " + k.value + ";" + s;
  }
  function _(k) {
    var R = "", w = k.prefix || "";
    k.name && (R = " " + k.name);
    var V = k.type !== "page";
    return "@" + w + k.type + R + c + O(k, V) + s;
  }
  function C(k) {
    return r ? "/*" + (k.text || "") + "*/" + s : "";
  }
  function p(k) {
    var R;
    return k.selectors ? R = k.selectors.join("," + s) : (R = "@" + k.type, R += k.name ? " " + k.name : ""), h() + R + c + O(k) + s;
  }
  function g(k, R) {
    return k.reduce(function(w, V) {
      var ue = V.type === "comment" ? C(V) : R(V);
      return ue && w.push(ue), w;
    }, []);
  }
  function O(k, R) {
    var w = k.declarations, V = Y;
    return k.rules && (w = k.rules, V = p), w = M(w, V), w && (w = s + w + (R ? "" : s)), "{" + w + h() + "}";
  }
  function M(k, R) {
    if (!k)
      return "";
    h(1);
    var w = g(k, R);
    return h(-1), w.length ? w.join(s) : "";
  }
  function Y(k) {
    if (k.type === "property")
      return Q(k);
  }
  function W(k) {
    switch (k.type) {
      case "rule":
        return p(k);
      case "media":
      case "keyframes":
        return _(k);
      case "comment":
        return C(k);
      case "import":
      case "charset":
      case "namespace":
        return T(k);
      case "font-face":
      case "supports":
      case "viewport":
      case "document":
      case "page":
        return _(k);
    }
  }
  function Q(k) {
    var R = k.name ? k.name + ":" + c : "";
    return h() + R + k.value + ";";
  }
})(lc);
var Em = lc.exports, mm = {
  lex: oc,
  parse: hm,
  stringify: Em
}, fc = { exports: {} }, Tm = /([-.*+?^${}()|[\]\/\\])/g, bm = /\\/g, Ft = function(e) {
  return (e + "").replace(Tm, "\\$1");
}, Bt = function(e) {
  return (e + "").replace(bm, "");
}, pm = RegExp(
  /*
  #!/usr/bin/env ruby
  puts "\t\t" + DATA.read.gsub(/\(\?x\)|\s+#.*$|\s+|\\$|\\n/,'')
  __END__
      "(?x)^(?:\
        \\s* ( , ) \\s*               # Separator          \n\
      | \\s* ( <combinator>+ ) \\s*   # Combinator         \n\
      |      ( \\s+ )                 # CombinatorChildren \n\
      |      ( <unicode>+ | \\* )     # Tag                \n\
      | \\#  ( <unicode>+       )     # ID                 \n\
      | \\.  ( <unicode>+       )     # ClassName          \n\
      |                               # Attribute          \n\
      \\[  \
          \\s* (<unicode1>+)  (?:  \
              \\s* ([*^$!~|]?=)  (?:  \
                  \\s* (?:\
                      ([\"']?)(.*?)\\9 \
                  )\
              )  \
          )?  \\s*  \
      \\](?!\\]) \n\
      |   :+ ( <unicode>+ )(?:\
      \\( (?:\
          (?:([\"'])([^\\12]*)\\12)|((?:\\([^)]+\\)|[^()]*)+)\
      ) \\)\
      )?\
      )"
  */
  `^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:(["']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:(["'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)`.replace(/<combinator>/, "[" + Ft(">+~`!@$%^&={}\\;</") + "]").replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")
), dc = function(t) {
  this.combinator = t || " ", this.tag = "*";
};
dc.prototype.toString = function() {
  if (!this.raw) {
    var e = "", t, r;
    if (e += this.tag || "*", this.id && (e += "#" + this.id), this.classes && (e += "." + this.classList.join(".")), this.attributes)
      for (t = 0; r = this.attributes[t++]; )
        e += "[" + r.name + (r.operator ? r.operator + '"' + r.value + '"' : "") + "]";
    if (this.pseudos)
      for (t = 0; r = this.pseudos[t++]; )
        e += ":" + r.name, r.value && (e += "(" + r.value + ")");
    this.raw = e;
  }
  return this.raw;
};
var hc = function() {
  this.length = 0;
};
hc.prototype.toString = function() {
  if (!this.raw) {
    for (var e = "", t = 0, r; r = this[t++]; )
      t !== 1 && (e += " "), r.combinator !== " " && (e += r.combinator + " "), e += r;
    this.raw = e;
  }
  return this.raw;
};
var gm = function(e, t, r, n, u, i, s, c, l, h, T, _, C, p, g, O) {
  var M, Y;
  if ((t || !this.length) && (M = this[this.length++] = new hc(), t))
    return "";
  if (M || (M = this[this.length - 1]), (r || n || !M.length) && (Y = M[M.length++] = new dc(r)), Y || (Y = M[M.length - 1]), u)
    Y.tag = Bt(u);
  else if (i)
    Y.id = Bt(i);
  else if (s) {
    var W = Bt(s), Q = Y.classes || (Y.classes = {});
    if (!Q[W]) {
      Q[W] = Ft(s);
      var k = Y.classList || (Y.classList = []);
      k.push(W), k.sort();
    }
  } else
    C ? (O = O || g, (Y.pseudos || (Y.pseudos = [])).push({
      type: _.length == 1 ? "class" : "element",
      name: Bt(C),
      escapedName: Ft(C),
      value: O ? Bt(O) : null,
      escapedValue: O ? Ft(O) : null
    })) : c && (T = T ? Ft(T) : null, (Y.attributes || (Y.attributes = [])).push({
      operator: l,
      name: Bt(c),
      escapedName: Ft(c),
      value: T ? Bt(T) : null,
      escapedValue: T ? Ft(T) : null
    }));
  return "";
}, Ec = function(t) {
  this.length = 0;
  for (var r = this, n = t, u; t; ) {
    if (u = t.replace(pm, function() {
      return gm.apply(r, arguments);
    }), u === t)
      throw new Error(n + " is an invalid expression");
    t = u;
  }
};
Ec.prototype.toString = function() {
  if (!this.raw) {
    for (var e = [], t = 0, r; r = this[t++]; )
      e.push(r);
    this.raw = e.join(", ");
  }
  return this.raw;
};
var Qi = {}, _m = function(e) {
  return e == null ? null : (e = ("" + e).replace(/^\s+|\s+$/g, ""), Qi[e] || (Qi[e] = new Ec(e)));
}, Am = _m;
(function(e, t) {
  var r = Am;
  e.exports = n;
  function n(i, s) {
    this.text = i, this.spec = void 0, this.styleAttribute = s || !1;
  }
  n.prototype.parsed = function() {
    return this.tokens || (this.tokens = u(this.text)), this.tokens;
  }, n.prototype.specificity = function() {
    var i = this.styleAttribute;
    return this.spec || (this.spec = s(this.text, this.parsed())), this.spec;
    function s(c, l) {
      for (var h = l || u(c), T = [i ? 1 : 0, 0, 0, 0], _ = [], C = 0; C < h.length; C++) {
        var p = h[C], g = p.pseudos;
        if (p.id && T[1]++, p.attributes && (T[2] += p.attributes.length), p.classList && (T[2] += p.classList.length), p.tag && p.tag !== "*" && T[3]++, g) {
          T[3] += g.length;
          for (var O = 0; O < g.length; O++)
            g[O].name === "not" && (_.push(g[O].value), T[3]--);
        }
      }
      for (var M = _.length; M--; )
        for (var Y = s(_[M]), W = 4; W--; )
          T[W] += Y[W];
      return T;
    }
  };
  function u(i) {
    try {
      return r(i)[0];
    } catch {
      return [];
    }
  }
})(fc);
var Cm = fc.exports, Bu = { exports: {} }, Vi;
function Nm() {
  return Vi || (Vi = 1, function(e, t) {
    e.exports = n;
    var r = Ma();
    function n(u, i, s, c, l) {
      this.prop = u, this.value = i, this.selector = s, this.priority = c || 0, this.additionalPriority = l || [];
    }
    n.prototype.compareFunc = function(u) {
      var i = [];
      i.push.apply(i, this.selector.specificity()), i.push.apply(i, this.additionalPriority), i[0] += this.priority;
      var s = [];
      return s.push.apply(s, u.selector.specificity()), s.push.apply(s, u.additionalPriority), s[0] += u.priority, r.compareFunc(i, s);
    }, n.prototype.compare = function(u) {
      var i = this.compareFunc(u);
      return i === 1 ? this : u;
    }, n.prototype.toString = function() {
      return this.prop + ": " + this.value.replace(/['"]+/g, "") + ";";
    };
  }(Bu)), Bu.exports;
}
var Xi;
function Ma() {
  return Xi || (Xi = 1, function(e) {
    var t = mm, r = Cm, n = Nm();
    e.Selector = r, e.Property = n;
    /**
     * Returns an array of the selectors.
     *
     * @license Sizzle CSS Selector Engine - MIT
     * @param {String} selectorText from mensch
     * @api public
     */
    e.extract = function(i) {
      for (var s = 0, c = [], l = "", h = 0, T = i.length; h < T; h++) {
        var _ = i.charAt(h);
        s ? ((_ === "]" || _ === ")") && s--, l += _) : _ === "," ? (c.push(l), l = "") : ((_ === "[" || _ === "(") && s++, (l.length || _ !== "," && _ !== `
` && _ !== " ") && (l += _));
      }
      return l.length && c.push(l), c;
    }, e.parseCSS = function(u) {
      for (var i = t.parse(u, { position: !0, comments: !0 }), s = typeof i.stylesheet < "u" && i.stylesheet.rules ? i.stylesheet.rules : [], c = [], l = 0, h = s.length; l < h; l++)
        if (s[l].type == "rule")
          for (var T = s[l], _ = T.selectors, C = 0, p = _.length; C < p; C++)
            c.push([_[C], T.declarations]);
      return c;
    }, e.getPreservedText = function(u, i, s) {
      for (var c = t.parse(u, { position: !0, comments: !0 }), l = typeof c.stylesheet < "u" && c.stylesheet.rules ? c.stylesheet.rules : [], h = [], T = l.length - 1; T >= 0; T--)
        (i.fontFaces && l[T].type === "font-face" || i.mediaQueries && l[T].type === "media" || i.keyFrames && l[T].type === "keyframes" || i.pseudos && l[T].selectors && this.matchesPseudo(l[T].selectors[0], s)) && h.unshift(
          t.stringify(
            { stylesheet: { rules: [l[T]] } },
            { comments: !1, indentation: "  " }
          )
        ), l[T].position.start;
      return h.length === 0 ? !1 : `
` + h.join(`
`) + `
`;
    }, e.normalizeLineEndings = function(u) {
      return u.replace(/\r\n/g, `
`).replace(/\n/g, `\r
`);
    }, e.matchesPseudo = function(u, i) {
      return i.find(function(s) {
        return u.indexOf(s) > -1;
      });
    }, e.compareFunc = function(u, i) {
      for (var s = Math.min(u.length, i.length), c = 0; c < s; c++)
        if (u[c] !== i[c])
          return u[c] > i[c] ? 1 : -1;
      return u.length - i.length;
    }, e.compare = function(u, i) {
      return e.compareFunc(u, i) == 1 ? u : i;
    }, e.getDefaultOptions = function(u) {
      var i = Object.assign({
        extraCss: "",
        insertPreservedExtraCss: !0,
        applyStyleTags: !0,
        removeStyleTags: !0,
        preserveMediaQueries: !0,
        preserveFontFaces: !0,
        preserveKeyFrames: !0,
        preservePseudos: !0,
        applyWidthAttributes: !0,
        applyHeightAttributes: !0,
        applyAttributesTableElements: !0,
        url: ""
      }, u);
      return i.webResources = i.webResources || {}, i;
    };
  }(wu)), wu;
}
(function(e) {
  var t = Ts;
  Ma();
  var r = function(u, i, s) {
    return i = Object.assign({ decodeEntities: !1, _useHtmlParser2: !0 }, i), u = s(u), t.load(u, i);
  }, n = function() {
    var u = [], i = function(c) {
      var l = e.exports.codeBlocks;
      return Object.keys(l).forEach(function(h) {
        var T = new RegExp(l[h].start + "([\\S\\s]*?)" + l[h].end, "g");
        c = c.replace(T, function(_, C) {
          return u.push(_), "JUICE_CODE_BLOCK_" + (u.length - 1) + "_";
        });
      }), c;
    }, s = function(c) {
      for (var l = 0; l < u.length; l++) {
        var h = new RegExp("JUICE_CODE_BLOCK_" + l + '_(="")?', "gi");
        c = c.replace(h, function() {
          return u[l];
        });
      }
      return c;
    };
    return {
      encodeEntities: i,
      decodeEntities: s
    };
  };
  e.exports = function(u, i, s, c) {
    var l = n(), h = r(u, i, l.encodeEntities), T = [h];
    T.push.apply(T, c);
    var _ = s.apply(void 0, T) || h;
    return i && i.xmlMode ? l.decodeEntities(_.xml()) : l.decodeEntities(_.html());
  }, e.exports.codeBlocks = {
    EJS: { start: "<%", end: "%>" },
    HBS: { start: "{{", end: "}}" }
  };
})(ms);
var Im = ms.exports, ka = {};
ka.romanize = function(e) {
  if (isNaN(e))
    return NaN;
  for (var t = String(+e).split(""), r = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX"
  ], n = "", u = 3; u--; )
    n = (r[+t.pop() + u * 10] || "") + n;
  return Array(+t.join("") + 1).join("M") + n;
};
ka.alphanumeric = function(e) {
  for (var t = "", r; e > 0; )
    r = (e - 1) % 26, t = String.fromCharCode(65 + r) + t, e = (e - r) / 26 | 0;
  return t || void 0;
};
var It = Ma(), _n = ka, Sm = function(t) {
  t.ignoredPseudos = ["hover", "active", "focus", "visited", "link"], t.widthElements = ["TABLE", "TD", "TH", "IMG"], t.heightElements = ["TABLE", "TD", "TH", "IMG"], t.tableElements = ["TABLE", "TH", "TR", "TD", "CAPTION", "COLGROUP", "COL", "THEAD", "TBODY", "TFOOT"], t.nonVisualElements = ["HEAD", "TITLE", "BASE", "LINK", "STYLE", "META", "SCRIPT", "NOSCRIPT"], t.styleToAttribute = {
    "background-color": "bgcolor",
    "background-image": "background",
    "text-align": "align",
    "vertical-align": "valign"
  }, t.excludedProperties = [], t.juiceDocument = T, t.inlineDocument = r;
  function r(p, g, O) {
    O = O || {};
    var M = It.parseCSS(g), Y = [], W = "style", Q = {};
    if (O.styleAttributeName && (W = O.styleAttributeName), M.forEach(w), Y.forEach(V), O.inlinePseudoElements && Y.forEach(ue), O.applyWidthAttributes && Y.forEach(function(z) {
      oe(z, "width");
    }), O.applyHeightAttributes && Y.forEach(function(z) {
      oe(z, "height");
    }), O.applyAttributesTableElements && Y.forEach(Ze), O.insertPreservedExtraCss && O.extraCss) {
      var k = It.getPreservedText(O.extraCss, {
        mediaQueries: O.preserveMediaQueries,
        fontFaces: O.preserveFontFaces,
        keyFrames: O.preserveKeyFrames
      });
      if (k) {
        var R = null;
        O.insertPreservedExtraCss !== !0 ? R = p(O.insertPreservedExtraCss) : (R = p("head"), R.length || (R = p("body")), R.length || (R = p.root())), R.first().append("<style>" + k + "</style>");
      }
    }
    function w(z) {
      var me = z[0], ge = z[1], de = new It.Selector(me), se = de.parsed();
      if (se) {
        for (var re = c(se), S = 0; S < se.length; ++S) {
          var x = se[S];
          if (x.pseudos)
            for (var v = 0; v < x.pseudos.length; ++v) {
              var B = x.pseudos[v];
              if (t.ignoredPseudos.indexOf(B.name) >= 0)
                return;
            }
        }
        if (re) {
          var U = se[se.length - 1], X = U.pseudos;
          U.pseudos = h(U.pseudos), me = se.toString(), U.pseudos = X;
        }
        var j;
        try {
          j = p(me);
        } catch {
          return;
        }
        j.each(function() {
          var D = this;
          if (D.name && t.nonVisualElements.indexOf(D.name.toUpperCase()) >= 0)
            return;
          if (D.counterProps || (D.counterProps = D.parent && D.parent.counterProps ? Object.create(D.parent.counterProps) : {}), re) {
            var F = "pseudo" + re, le = D[F];
            le || (le = D[F] = p("<span />").get(0), le.pseudoElementType = re, le.pseudoElementParent = D, le.counterProps = D.counterProps, D[F] = le), D = le;
          }
          if (!D.styleProps) {
            if (D.styleProps = {}, p(D).attr(W)) {
              var J = "* { " + p(D).attr(W) + " } ";
              be(It.parseCSS(J)[0][1], new It.Selector("<style>", !0));
            }
            Y.push(D);
          }
          function De(Ae, Ke) {
            for (var Oe = Ke.split(/\s+/), Fe = 0; Fe < Oe.length; Fe++) {
              var ve = Oe[Fe], He = parseInt(Oe[Fe + 1], 10);
              isNaN(He) ? Ae.counterProps[ve] = Q[ve] = 0 : Ae.counterProps[ve] = Q[Oe[Fe++]] = He;
            }
          }
          function Ge(Ae, Ke) {
            for (var Oe = Ke.split(/\s+/), Fe = 0; Fe < Oe.length; Fe++) {
              var ve = Oe[Fe];
              if (Ae.counterProps[ve] !== void 0) {
                var He = parseInt(Oe[Fe + 1], 10);
                isNaN(He) ? Ae.counterProps[ve] = Q[ve] += 1 : Ae.counterProps[ve] = Q[Oe[Fe++]] += He;
              }
            }
          }
          function be(Ae, Ke) {
            for (var Oe = 0, Fe = Ae.length; Oe < Fe; Oe++)
              if (Ae[Oe].type == "property") {
                var ve = Ae[Oe].name, He = Ae[Oe].value;
                ve === "counter-reset" && De(D, He), ve === "counter-increment" && Ge(D, He);
                var Cr = He.match(/!important$/) !== null;
                Cr && !O.preserveImportant && (He = n(He));
                var ou = [Ae[Oe].position.start.line, Ae[Oe].position.start.col], Xt = new It.Property(ve, He, Ke, Cr ? 2 : 0, ou), ht = D.styleProps[ve];
                t.excludedProperties.indexOf(ve) < 0 && (ht && ht.compare(Xt) === Xt || !ht) && (ht && ht.selector !== Ke ? delete D.styleProps[ve] : ht && (Xt.nextProp = ht), D.styleProps[ve] = Xt);
              }
          }
          be(ge, de);
        });
      }
    }
    function V(z) {
      Object.keys(z.styleProps).length;
      var me = [];
      Object.keys(z.styleProps).forEach(function(de) {
        for (var se = z.styleProps[de]; typeof se < "u"; )
          me.push(se), se = se.nextProp;
      }), me.sort(function(de, se) {
        return de.compareFunc(se);
      });
      var ge = me.filter(function(de) {
        return de.prop !== "content";
      }).map(function(de) {
        return de.prop + ": " + de.value.replace(/["]/g, "'") + ";";
      }).join(" ");
      ge && p(z).attr(W, ge);
    }
    function ue(z) {
      if (z.pseudoElementType && z.styleProps.content) {
        var me = s(z);
        me.img ? (z.name = "img", p(z).attr("src", me.img)) : p(z).text(me);
        var ge = z.pseudoElementParent;
        z.pseudoElementType === "before" ? p(ge).prepend(z) : p(ge).append(z);
      }
    }
    function oe(z, me) {
      if (z.name) {
        var ge = z.name.toUpperCase();
        if (t[me + "Elements"].indexOf(ge) > -1) {
          for (var de in z.styleProps)
            if (z.styleProps[de].prop === me) {
              var se = z.styleProps[de].value;
              if (O.preserveImportant && (se = n(se)), se.match(/(px|auto)/)) {
                var re = se.replace("px", "");
                p(z).attr(me, re);
                return;
              }
              if (t.tableElements.indexOf(ge) > -1 && se.match(/\%/)) {
                p(z).attr(me, se);
                return;
              }
            }
        }
      }
    }
    function Te(z) {
      return z.indexOf("url(") !== 0 ? z : z.replace(/^url\((["'])?([^"']+)\1\)$/, "$2");
    }
    function Ze(z) {
      if (z.name) {
        var me = z.name.toUpperCase(), ge = Object.keys(t.styleToAttribute);
        if (t.tableElements.indexOf(me) > -1) {
          for (var de in z.styleProps)
            if (ge.indexOf(z.styleProps[de].prop) > -1) {
              var se = t.styleToAttribute[z.styleProps[de].prop], re = z.styleProps[de].value;
              if (O.preserveImportant && (re = n(re)), se === "background" && (re = Te(re)), /(linear|radial)-gradient\(/i.test(re))
                continue;
              p(z).attr(se, re);
            }
        }
      }
    }
  }
  function n(p) {
    return p.replace(/\s*!important$/, "");
  }
  function u(p, g) {
    for (; p; ) {
      if (g in p.styleProps)
        return p.styleProps[g].value;
      var p = p.pseudoElementParent || p.parent;
    }
  }
  function i(p, g) {
    switch (g) {
      case "lower-roman":
        return _n.romanize(p).toLowerCase();
      case "upper-roman":
        return _n.romanize(p);
      case "lower-latin":
      case "lower-alpha":
        return _n.alphanumeric(p).toLowerCase();
      case "upper-latin":
      case "upper-alpha":
        return _n.alphanumeric(p);
      default:
        return p.toString();
    }
  }
  function s(p) {
    var g = p.styleProps.content.value;
    if (g === "none" || g === "normal")
      return "";
    var O = g.match(/^\s*url\s*\(\s*(.*?)\s*\)\s*$/i);
    if (O) {
      var M = O[1].replace(/^['"]|['"]$/g, "");
      return { img: M };
    }
    for (var Y = [], W = g.split(/['"]/), Q = 0; Q < W.length; Q++)
      if (W[Q] !== "") {
        var k = W[Q].match(/var\s*\(\s*(.*?)\s*(,\s*(.*?)\s*)?\s*\)/i);
        if (k) {
          var R = u(p, k[1]) || k[2];
          Y.push(R.replace(/^['"]|['"]$/g, ""));
          continue;
        }
        var w = W[Q].match(/counter\s*\(\s*(.*?)\s*(,\s*(.*?)\s*)?\s*\)/i);
        if (w && w[1] in p.counterProps) {
          var V = p.counterProps[w[1]];
          Y.push(i(V, w[3]));
          continue;
        }
        var ue = W[Q].match(/attr\s*\(\s*(.*?)\s*\)/i);
        if (ue) {
          var oe = ue[1];
          Y.push(
            p.pseudoElementParent ? p.pseudoElementParent.attribs[oe] : p.attribs[oe]
          );
          continue;
        }
        Y.push(W[Q]);
      }
    return g = Y.join(""), g = g.replace(/\\/g, ""), g;
  }
  function c(p) {
    if (p.length !== 0) {
      var g = p[p.length - 1].pseudos;
      if (g) {
        for (var O = 0; O < g.length; O++)
          if (l(g[O]))
            return g[O].name;
      }
    }
  }
  function l(p) {
    return p.name === "before" || p.name === "after";
  }
  function h(p) {
    return p.filter(function(g) {
      return !l(g);
    });
  }
  function T(p, g) {
    g = It.getDefaultOptions(g);
    var O = C(p, g);
    return O += `
` + g.extraCss, r(p, O, g), p;
  }
  function _(p, g) {
    var O = [], M = p("style"), Y, W, Q;
    return M.each(function() {
      Q = this;
      var k = !!Q.childNodes;
      if (Y = k ? Q.childNodes : Q.children, Y.length !== 1) {
        g.removeStyleTags && p(Q).remove();
        return;
      }
      if (W = Y[0].data, g.applyStyleTags && p(Q).attr("data-embed") === void 0 && O.push(W), g.removeStyleTags && p(Q).attr("data-embed") === void 0) {
        var R = k ? Q.childNodes[0].nodeValue : Q.children[0].data, w = It.getPreservedText(R, {
          mediaQueries: g.preserveMediaQueries,
          fontFaces: g.preserveFontFaces,
          keyFrames: g.preserveKeyFrames,
          pseudos: g.preservePseudos
        }, t.ignoredPseudos);
        w ? k ? Q.childNodes[0].nodeValue = w : Q.children[0].data = w : p(Q).remove();
      }
      p(Q).removeAttr("data-embed");
    }), O;
  }
  function C(p, g) {
    var O = _(p, g), M = O.join(`
`);
    return M;
  }
  return t;
}, wa = Im, ym = Sm, $r = ym(function(e, t) {
  return wa(e, { xmlMode: t && t.xmlMode }, Om, [t]);
}), Om = function(e, t) {
  return $r.juiceDocument(e, t);
};
$r.inlineContent = function(e, t, r) {
  return wa(e, { xmlMode: r && r.xmlMode }, $r.inlineDocument, [t, r]);
};
$r.codeBlocks = wa.codeBlocks;
var vm = $r;
const xm = /* @__PURE__ */ Er(vm);
class Rm {
  constructor(t) {
    li(this, "options");
    this.options = Object.assign({}, this.defaultOptions(), t ?? {});
  }
  defaultOptions() {
  }
  async initialize(t) {
    return t;
  }
  async preprocess(t) {
    return Promise.resolve(t);
  }
  async process(t) {
    return Promise.resolve(t);
  }
  async postprocess(t) {
    return Promise.resolve(t);
  }
  async transform(t) {
    return t;
  }
}
const Ba = {
  xml: !1,
  decodeEntities: !0
}, Ki = {
  _useHtmlParser2: !0,
  xmlMode: !0
};
function Ju(e) {
  return e != null && e.xml ? typeof e.xml == "boolean" ? Ki : { ...Ki, ...e.xml } : e ?? void 0;
}
function mc(e, t, r) {
  return e ? e(t ?? e._root.children, null, void 0, r).toString() : "";
}
function Lm(e, t) {
  return !t && typeof e == "object" && e != null && !("length" in e) && !("type" in e);
}
function Dm(e, t) {
  const r = Lm(e) ? (t = e, void 0) : e, n = {
    ...Ba,
    ...this === null || this === void 0 ? void 0 : this._options,
    ...Ju(t ?? {})
  };
  return mc(this, r, n);
}
function Pm(e) {
  const t = { ...this._options, xmlMode: !0 };
  return mc(this, e, t);
}
function qr(e) {
  const t = e || (this ? this.root() : []);
  let r = "";
  for (let n = 0; n < t.length; n++)
    r += or(t[n]);
  return r;
}
function Mm(e, t, r = typeof t == "boolean" ? t : !1) {
  if (!e || typeof e != "string")
    return null;
  typeof t == "boolean" && (r = t);
  const n = this.load(e, Ba, !1);
  return r || n("script").remove(), n.root()[0].children.slice();
}
function km() {
  return this(this._root);
}
function Tc(e, t) {
  if (t === e)
    return !1;
  let r = t;
  for (; r && r !== r.parent; )
    if (r = r.parent, r === e)
      return !0;
  return !1;
}
function wm(e, t) {
  if (!zi(e) || !zi(t))
    return;
  let r = e.length;
  const n = +t.length;
  for (let u = 0; u < n; u++)
    e[r++] = t[u];
  return e.length = r, e;
}
function zi(e) {
  if (Array.isArray(e))
    return !0;
  if (typeof e != "object" || !Object.prototype.hasOwnProperty.call(e, "length") || typeof e.length != "number" || e.length < 0)
    return !1;
  for (let t = 0; t < e.length; t++)
    if (!(t in e))
      return !1;
  return !0;
}
const Bm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  contains: Tc,
  html: Dm,
  merge: wm,
  parseHTML: Mm,
  root: km,
  text: qr,
  xml: Pm
}, Symbol.toStringTag, { value: "Module" }));
function lt(e) {
  return e.cheerio != null;
}
function Fm(e) {
  return e.replace(/[_.-](\w|$)/g, (t, r) => r.toUpperCase());
}
function Um(e) {
  return e.replace(/[A-Z]/g, "-$&").toLowerCase();
}
function Ce(e, t) {
  const r = e.length;
  for (let n = 0; n < r; n++)
    t(e[n], n);
  return e;
}
function ea(e) {
  const t = "length" in e ? Array.prototype.map.call(e, (n) => Ur(n, !0)) : [Ur(e, !0)], r = new xt(t);
  return t.forEach((n) => {
    n.parent = r;
  }), t;
}
var Ht;
(function(e) {
  e[e.LowerA = 97] = "LowerA", e[e.LowerZ = 122] = "LowerZ", e[e.UpperA = 65] = "UpperA", e[e.UpperZ = 90] = "UpperZ", e[e.Exclamation = 33] = "Exclamation";
})(Ht || (Ht = {}));
function ta(e) {
  const t = e.indexOf("<");
  if (t < 0 || t > e.length - 3)
    return !1;
  const r = e.charCodeAt(t + 1);
  return (r >= Ht.LowerA && r <= Ht.LowerZ || r >= Ht.UpperA && r <= Ht.UpperZ || r === Ht.Exclamation) && e.includes(">", t + 2);
}
const nr = Object.prototype.hasOwnProperty, jr = /\s+/, Fu = "data-", Zi = {
  null: null,
  true: !0,
  false: !1
}, Fa = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Hm = /^{[^]*}$|^\[[^]*]$/;
function wn(e, t, r) {
  var n;
  if (!(!e || !Z(e))) {
    if ((n = e.attribs) !== null && n !== void 0 || (e.attribs = {}), !t)
      return e.attribs;
    if (nr.call(e.attribs, t))
      return !r && Fa.test(t) ? t : e.attribs[t];
    if (e.name === "option" && t === "value")
      return qr(e.children);
    if (e.name === "input" && (e.attribs.type === "radio" || e.attribs.type === "checkbox") && t === "value")
      return "on";
  }
}
function ur(e, t, r) {
  r === null ? bc(e, t) : e.attribs[t] = `${r}`;
}
function Ym(e, t) {
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e != "string")
        throw new Error("Bad combination of arguments.");
      return Ce(this, (r, n) => {
        Z(r) && ur(r, e, t.call(r, n, r.attribs[e]));
      });
    }
    return Ce(this, (r) => {
      Z(r) && (typeof e == "object" ? Object.keys(e).forEach((n) => {
        const u = e[n];
        ur(r, n, u);
      }) : ur(r, e, t));
    });
  }
  return arguments.length > 1 ? this : wn(this[0], e, this.options.xmlMode);
}
function Ji(e, t, r) {
  return t in e ? (
    // @ts-expect-error TS doesn't like us accessing the value directly here.
    e[t]
  ) : !r && Fa.test(t) ? wn(e, t, !1) !== void 0 : wn(e, t, r);
}
function Uu(e, t, r, n) {
  t in e ? e[t] = r : ur(e, t, !n && Fa.test(t) ? r ? "" : null : `${r}`);
}
function $m(e, t) {
  var r;
  if (typeof e == "string" && t === void 0) {
    const n = this[0];
    if (!n || !Z(n))
      return;
    switch (e) {
      case "style": {
        const u = this.css(), i = Object.keys(u);
        return i.forEach((s, c) => {
          u[c] = s;
        }), u.length = i.length, u;
      }
      case "tagName":
      case "nodeName":
        return n.name.toUpperCase();
      case "href":
      case "src": {
        const u = (r = n.attribs) === null || r === void 0 ? void 0 : r[e];
        return typeof URL < "u" && (e === "href" && (n.tagName === "a" || n.name === "link") || e === "src" && (n.tagName === "img" || n.tagName === "iframe" || n.tagName === "audio" || n.tagName === "video" || n.tagName === "source")) && u !== void 0 && this.options.baseURI ? new URL(u, this.options.baseURI).href : u;
      }
      case "innerText":
        return Sn(n);
      case "textContent":
        return or(n);
      case "outerHTML":
        return this.clone().wrap("<container />").parent().html();
      case "innerHTML":
        return this.html();
      default:
        return Ji(n, e, this.options.xmlMode);
    }
  }
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e == "object")
        throw new Error("Bad combination of arguments.");
      return Ce(this, (n, u) => {
        Z(n) && Uu(n, e, t.call(n, u, Ji(n, e, this.options.xmlMode)), this.options.xmlMode);
      });
    }
    return Ce(this, (n) => {
      Z(n) && (typeof e == "object" ? Object.keys(e).forEach((u) => {
        const i = e[u];
        Uu(n, u, i, this.options.xmlMode);
      }) : Uu(n, e, t, this.options.xmlMode));
    });
  }
}
function es(e, t, r) {
  var n;
  const u = e;
  (n = u.data) !== null && n !== void 0 || (u.data = {}), typeof t == "object" ? Object.assign(u.data, t) : typeof t == "string" && r !== void 0 && (u.data[t] = r);
}
function ts(e, t) {
  let r, n, u;
  t == null ? (r = Object.keys(e.attribs).filter((i) => i.startsWith(Fu)), n = r.map((i) => Fm(i.slice(Fu.length)))) : (r = [Fu + Um(t)], n = [t]);
  for (let i = 0; i < r.length; ++i) {
    const s = r[i], c = n[i];
    if (nr.call(e.attribs, s) && !nr.call(e.data, c)) {
      if (u = e.attribs[s], nr.call(Zi, u))
        u = Zi[u];
      else if (u === String(Number(u)))
        u = Number(u);
      else if (Hm.test(u))
        try {
          u = JSON.parse(u);
        } catch {
        }
      e.data[c] = u;
    }
  }
  return t == null ? e.data : u;
}
function qm(e, t) {
  var r;
  const n = this[0];
  if (!n || !Z(n))
    return;
  const u = n;
  return (r = u.data) !== null && r !== void 0 || (u.data = {}), e ? typeof e == "object" || t !== void 0 ? (Ce(this, (i) => {
    Z(i) && (typeof e == "object" ? es(i, e) : es(i, e, t));
  }), this) : nr.call(u.data, e) ? u.data[e] : ts(u, e) : ts(u);
}
function jm(e) {
  const t = arguments.length === 0, r = this[0];
  if (!r || !Z(r))
    return t ? void 0 : this;
  switch (r.name) {
    case "textarea":
      return this.text(e);
    case "select": {
      const n = this.find("option:selected");
      if (!t) {
        if (this.attr("multiple") == null && typeof e == "object")
          return this;
        this.find("option").removeAttr("selected");
        const u = typeof e != "object" ? [e] : e;
        for (let i = 0; i < u.length; i++)
          this.find(`option[value="${u[i]}"]`).attr("selected", "");
        return this;
      }
      return this.attr("multiple") ? n.toArray().map((u) => qr(u.children)) : n.attr("value");
    }
    case "input":
    case "option":
      return t ? this.attr("value") : this.attr("value", e);
  }
}
function bc(e, t) {
  !e.attribs || !nr.call(e.attribs, t) || delete e.attribs[t];
}
function Bn(e) {
  return e ? e.trim().split(jr) : [];
}
function Gm(e) {
  const t = Bn(e);
  for (let r = 0; r < t.length; r++)
    Ce(this, (n) => {
      Z(n) && bc(n, t[r]);
    });
  return this;
}
function Wm(e) {
  return this.toArray().some((t) => {
    const r = Z(t) && t.attribs.class;
    let n = -1;
    if (r && e.length)
      for (; (n = r.indexOf(e, n + 1)) > -1; ) {
        const u = n + e.length;
        if ((n === 0 || jr.test(r[n - 1])) && (u === r.length || jr.test(r[u])))
          return !0;
      }
    return !1;
  });
}
function pc(e) {
  if (typeof e == "function")
    return Ce(this, (n, u) => {
      if (Z(n)) {
        const i = n.attribs.class || "";
        pc.call([n], e.call(n, u, i));
      }
    });
  if (!e || typeof e != "string")
    return this;
  const t = e.split(jr), r = this.length;
  for (let n = 0; n < r; n++) {
    const u = this[n];
    if (!Z(u))
      continue;
    const i = wn(u, "class", !1);
    if (!i)
      ur(u, "class", t.join(" ").trim());
    else {
      let s = ` ${i} `;
      for (let c = 0; c < t.length; c++) {
        const l = `${t[c]} `;
        s.includes(` ${l}`) || (s += l);
      }
      ur(u, "class", s.trim());
    }
  }
  return this;
}
function gc(e) {
  if (typeof e == "function")
    return Ce(this, (u, i) => {
      Z(u) && gc.call([u], e.call(u, i, u.attribs.class || ""));
    });
  const t = Bn(e), r = t.length, n = arguments.length === 0;
  return Ce(this, (u) => {
    if (Z(u))
      if (n)
        u.attribs.class = "";
      else {
        const i = Bn(u.attribs.class);
        let s = !1;
        for (let c = 0; c < r; c++) {
          const l = i.indexOf(t[c]);
          l >= 0 && (i.splice(l, 1), s = !0, c--);
        }
        s && (u.attribs.class = i.join(" "));
      }
  });
}
function _c(e, t) {
  if (typeof e == "function")
    return Ce(this, (s, c) => {
      Z(s) && _c.call([s], e.call(s, c, s.attribs.class || "", t), t);
    });
  if (!e || typeof e != "string")
    return this;
  const r = e.split(jr), n = r.length, u = typeof t == "boolean" ? t ? 1 : -1 : 0, i = this.length;
  for (let s = 0; s < i; s++) {
    const c = this[s];
    if (!Z(c))
      continue;
    const l = Bn(c.attribs.class);
    for (let h = 0; h < n; h++) {
      const T = l.indexOf(r[h]);
      u >= 0 && T < 0 ? l.push(r[h]) : u <= 0 && T >= 0 && l.splice(T, 1);
    }
    c.attribs.class = l.join(" ");
  }
  return this;
}
const Qm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addClass: pc,
  attr: Ym,
  data: qm,
  hasClass: Wm,
  prop: $m,
  removeAttr: Gm,
  removeClass: gc,
  toggleClass: _c,
  val: jm
}, Symbol.toStringTag, { value: "Module" })), Vm = /^\s*[~+]/;
function Xm(e) {
  var t;
  if (!e)
    return this._make([]);
  const r = this.toArray();
  if (typeof e != "string") {
    const i = lt(e) ? e.toArray() : [e];
    return this._make(i.filter((s) => r.some((c) => Tc(c, s))));
  }
  const n = Vm.test(e) ? r : this.children().toArray(), u = {
    context: r,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0],
    // Pass options that are recognized by `cheerio-select`
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(so(e, n, u));
}
function Ua(e) {
  return function(t, ...r) {
    return function(n) {
      var u;
      let i = e(t, this);
      return n && (i = $a(i, n, this.options.xmlMode, (u = this._root) === null || u === void 0 ? void 0 : u[0])), this._make(
        // Post processing is only necessary if there is more than one element.
        this.length > 1 && i.length > 1 ? r.reduce((s, c) => c(s), i) : i
      );
    };
  };
}
const en = Ua((e, t) => {
  const r = [];
  for (let n = 0; n < t.length; n++) {
    const u = e(t[n]);
    r.push(u);
  }
  return new Array().concat(...r);
}), Ha = Ua((e, t) => {
  const r = [];
  for (let n = 0; n < t.length; n++) {
    const u = e(t[n]);
    u !== null && r.push(u);
  }
  return r;
});
function Ya(e, ...t) {
  let r = null;
  const n = Ua((u, i) => {
    const s = [];
    return Ce(i, (c) => {
      for (let l; (l = u(c)) && !(r != null && r(l, s.length)); c = l)
        s.push(l);
    }), s;
  })(e, ...t);
  return function(u, i) {
    r = typeof u == "string" ? (c) => Ta(c, u, this.options) : u ? tn(u) : null;
    const s = n.call(this, i);
    return r = null, s;
  };
}
function Ar(e) {
  return Array.from(new Set(e));
}
const Km = Ha(({ parent: e }) => e && !Rt(e) ? e : null, Ar), zm = en((e) => {
  const t = [];
  for (; e.parent && !Rt(e.parent); )
    t.push(e.parent), e = e.parent;
  return t;
}, br, (e) => e.reverse()), Zm = Ya(({ parent: e }) => e && !Rt(e) ? e : null, br, (e) => e.reverse());
function Jm(e) {
  var t;
  const r = [];
  if (!e)
    return this._make(r);
  const n = {
    xmlMode: this.options.xmlMode,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0]
  }, u = typeof e == "string" ? (i) => Ta(i, e, n) : tn(e);
  return Ce(this, (i) => {
    for (; i && Z(i); ) {
      if (u(i, 0)) {
        r.includes(i) || r.push(i);
        break;
      }
      i = i.parent;
    }
  }), this._make(r);
}
const eT = Ha((e) => sa(e)), tT = en((e) => {
  const t = [];
  for (; e.next; )
    e = e.next, Z(e) && t.push(e);
  return t;
}, Ar), rT = Ya((e) => sa(e), Ar), nT = Ha((e) => oa(e)), uT = en((e) => {
  const t = [];
  for (; e.prev; )
    e = e.prev, Z(e) && t.push(e);
  return t;
}, Ar), aT = Ya((e) => oa(e), Ar), iT = en((e) => Bs(e).filter((t) => Z(t) && t !== e), br), sT = en((e) => Wn(e).filter(Z), Ar);
function oT() {
  const e = this.toArray().reduce((t, r) => Le(r) ? t.concat(r.children) : t, []);
  return this._make(e);
}
function cT(e) {
  let t = 0;
  const r = this.length;
  for (; t < r && e.call(this[t], t, this[t]) !== !1; )
    ++t;
  return this;
}
function lT(e) {
  let t = [];
  for (let r = 0; r < this.length; r++) {
    const n = this[r], u = e.call(n, r, n);
    u != null && (t = t.concat(u));
  }
  return this._make(t);
}
function tn(e) {
  return typeof e == "function" ? (t, r) => e.call(t, r, t) : lt(e) ? (t) => Array.prototype.includes.call(e, t) : function(t) {
    return e === t;
  };
}
function fT(e) {
  var t;
  return this._make($a(this.toArray(), e, this.options.xmlMode, (t = this._root) === null || t === void 0 ? void 0 : t[0]));
}
function $a(e, t, r, n) {
  return typeof t == "string" ? pa(t, e, { xmlMode: r, root: n }) : e.filter(tn(t));
}
function dT(e) {
  const t = this.toArray();
  return typeof e == "string" ? ba(t.filter(Z), e, this.options) : e ? t.some(tn(e)) : !1;
}
function hT(e) {
  let t = this.toArray();
  if (typeof e == "string") {
    const r = new Set(pa(e, t, this.options));
    t = t.filter((n) => !r.has(n));
  } else {
    const r = tn(e);
    t = t.filter((n, u) => !r(n, u));
  }
  return this._make(t);
}
function ET(e) {
  return this.filter(typeof e == "string" ? (
    // Using the `:has` selector here short-circuits searches.
    `:has(${e})`
  ) : (t, r) => this._make(r).find(e).length > 0);
}
function mT() {
  return this.length > 1 ? this._make(this[0]) : this;
}
function TT() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
function bT(e) {
  var t;
  return e = +e, e === 0 && this.length <= 1 ? this : (e < 0 && (e = this.length + e), this._make((t = this[e]) !== null && t !== void 0 ? t : []));
}
function pT(e) {
  return e == null ? this.toArray() : this[e < 0 ? this.length + e : e];
}
function gT() {
  return Array.prototype.slice.call(this);
}
function _T(e) {
  let t, r;
  return e == null ? (t = this.parent().children(), r = this[0]) : typeof e == "string" ? (t = this._make(e), r = this[0]) : (t = this, r = lt(e) ? e[0] : e), Array.prototype.indexOf.call(t, r);
}
function AT(e, t) {
  return this._make(Array.prototype.slice.call(this, e, t));
}
function CT() {
  var e;
  return (e = this.prevObject) !== null && e !== void 0 ? e : this._make([]);
}
function NT(e, t) {
  const r = this._make(e, t), n = br([...this.get(), ...r.get()]);
  return this._make(n);
}
function IT(e) {
  return this.prevObject ? this.add(e ? this.prevObject.filter(e) : this.prevObject) : this;
}
const ST = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: NT,
  addBack: IT,
  children: sT,
  closest: Jm,
  contents: oT,
  each: cT,
  end: CT,
  eq: bT,
  filter: fT,
  filterArray: $a,
  find: Xm,
  first: mT,
  get: pT,
  has: ET,
  index: _T,
  is: dT,
  last: TT,
  map: lT,
  next: eT,
  nextAll: tT,
  nextUntil: rT,
  not: hT,
  parent: Km,
  parents: zm,
  parentsUntil: Zm,
  prev: nT,
  prevAll: uT,
  prevUntil: aT,
  siblings: iT,
  slice: AT,
  toArray: gT
}, Symbol.toStringTag, { value: "Module" }));
function yT(e) {
  return function(r, n, u, i) {
    if (typeof Buffer < "u" && Buffer.isBuffer(r) && (r = r.toString()), typeof r == "string")
      return e(r, n, u, i);
    const s = r;
    if (!Array.isArray(s) && Rt(s))
      return s;
    const c = new xt([]);
    return jt(s, c), c;
  };
}
function jt(e, t) {
  const r = Array.isArray(e) ? e : [e];
  t ? t.children = r : t = null;
  for (let n = 0; n < r.length; n++) {
    const u = r[n];
    u.parent && u.parent.children !== r && Wt(u), t ? (u.prev = r[n - 1] || null, u.next = r[n + 1] || null) : u.prev = u.next = null, u.parent = t;
  }
  return t;
}
function OT(e, t) {
  return e == null ? [] : lt(e) ? t ? ea(e.get()) : e.get() : Array.isArray(e) ? e.reduce((r, n) => r.concat(this._makeDomArray(n, t)), []) : typeof e == "string" ? this._parse(e, this.options, !1, null).children : t ? ea([e]) : [e];
}
function Ac(e) {
  return function(...t) {
    const r = this.length - 1;
    return Ce(this, (n, u) => {
      if (!Le(n))
        return;
      const i = typeof t[0] == "function" ? t[0].call(n, u, this._render(n.children)) : t, s = this._makeDomArray(i, u < r);
      e(s, n.children, n);
    });
  };
}
function Dt(e, t, r, n, u) {
  var i, s;
  const c = [
    t,
    r,
    ...n
  ], l = t === 0 ? null : e[t - 1], h = t + r >= e.length ? null : e[t + r];
  for (let T = 0; T < n.length; ++T) {
    const _ = n[T], C = _.parent;
    if (C) {
      const g = C.children.indexOf(_);
      g > -1 && (C.children.splice(g, 1), u === C && t > g && c[0]--);
    }
    _.parent = u, _.prev && (_.prev.next = (i = _.next) !== null && i !== void 0 ? i : null), _.next && (_.next.prev = (s = _.prev) !== null && s !== void 0 ? s : null), _.prev = T === 0 ? l : n[T - 1], _.next = T === n.length - 1 ? h : n[T + 1];
  }
  return l && (l.next = n[0]), h && (h.prev = n[n.length - 1]), e.splice(...c);
}
function vT(e) {
  return (lt(e) ? e : this._make(e)).append(this), this;
}
function xT(e) {
  return (lt(e) ? e : this._make(e)).prepend(this), this;
}
const RT = Ac((e, t, r) => {
  Dt(t, t.length, 0, e, r);
}), LT = Ac((e, t, r) => {
  Dt(t, 0, 0, e, r);
});
function Cc(e) {
  return function(t) {
    const r = this.length - 1, n = this.parents().last();
    for (let u = 0; u < this.length; u++) {
      const i = this[u], s = typeof t == "function" ? t.call(i, u, i) : typeof t == "string" && !ta(t) ? n.find(t).clone() : t, [c] = this._makeDomArray(s, u < r);
      if (!c || !Le(c))
        continue;
      let l = c, h = 0;
      for (; h < l.children.length; ) {
        const T = l.children[h];
        Z(T) ? (l = T, h = 0) : h++;
      }
      e(i, l, [c]);
    }
    return this;
  };
}
const DT = Cc((e, t, r) => {
  const { parent: n } = e;
  if (!n)
    return;
  const u = n.children, i = u.indexOf(e);
  jt([e], t), Dt(u, i, 0, r, n);
}), PT = Cc((e, t, r) => {
  Le(e) && (jt(e.children, t), jt(r, e));
});
function MT(e) {
  return this.parent(e).not("body").each((t, r) => {
    this._make(r).replaceWith(r.children);
  }), this;
}
function kT(e) {
  const t = this[0];
  if (t) {
    const r = this._make(typeof e == "function" ? e.call(t, 0, t) : e).insertBefore(t);
    let n;
    for (let i = 0; i < r.length; i++)
      r[i].type === "tag" && (n = r[i]);
    let u = 0;
    for (; n && u < n.children.length; ) {
      const i = n.children[u];
      i.type === "tag" ? (n = i, u = 0) : u++;
    }
    n && this._make(n).append(this);
  }
  return this;
}
function wT(...e) {
  const t = this.length - 1;
  return Ce(this, (r, n) => {
    const { parent: u } = r;
    if (!Le(r) || !u)
      return;
    const i = u.children, s = i.indexOf(r);
    if (s < 0)
      return;
    const c = typeof e[0] == "function" ? e[0].call(r, n, this._render(r.children)) : e, l = this._makeDomArray(c, n < t);
    Dt(i, s + 1, 0, l, u);
  });
}
function BT(e) {
  typeof e == "string" && (e = this._make(e)), this.remove();
  const t = [];
  return this._makeDomArray(e).forEach((r) => {
    const n = this.clone().toArray(), { parent: u } = r;
    if (!u)
      return;
    const i = u.children, s = i.indexOf(r);
    s < 0 || (Dt(i, s + 1, 0, n, u), t.push(...n));
  }), this._make(t);
}
function FT(...e) {
  const t = this.length - 1;
  return Ce(this, (r, n) => {
    const { parent: u } = r;
    if (!Le(r) || !u)
      return;
    const i = u.children, s = i.indexOf(r);
    if (s < 0)
      return;
    const c = typeof e[0] == "function" ? e[0].call(r, n, this._render(r.children)) : e, l = this._makeDomArray(c, n < t);
    Dt(i, s, 0, l, u);
  });
}
function UT(e) {
  const t = this._make(e);
  this.remove();
  const r = [];
  return Ce(t, (n) => {
    const u = this.clone().toArray(), { parent: i } = n;
    if (!i)
      return;
    const s = i.children, c = s.indexOf(n);
    c < 0 || (Dt(s, c, 0, u, i), r.push(...u));
  }), this._make(r);
}
function HT(e) {
  const t = e ? this.filter(e) : this;
  return Ce(t, (r) => {
    Wt(r), r.prev = r.next = r.parent = null;
  }), this;
}
function YT(e) {
  return Ce(this, (t, r) => {
    const { parent: n } = t;
    if (!n)
      return;
    const u = n.children, i = typeof e == "function" ? e.call(t, r, t) : e, s = this._makeDomArray(i);
    jt(s, null);
    const c = u.indexOf(t);
    Dt(u, c, 1, s, n), s.includes(t) || (t.parent = t.prev = t.next = null);
  });
}
function $T() {
  return Ce(this, (e) => {
    Le(e) && (e.children.forEach((t) => {
      t.next = t.prev = t.parent = null;
    }), e.children.length = 0);
  });
}
function qT(e) {
  if (e === void 0) {
    const t = this[0];
    return !t || !Le(t) ? null : this._render(t.children);
  }
  return Ce(this, (t) => {
    if (!Le(t))
      return;
    t.children.forEach((n) => {
      n.next = n.prev = n.parent = null;
    });
    const r = lt(e) ? e.toArray() : this._parse(`${e}`, this.options, !1, t).children;
    jt(r, t);
  });
}
function jT() {
  return this._render(this);
}
function GT(e) {
  return e === void 0 ? qr(this) : typeof e == "function" ? Ce(this, (t, r) => this._make(t).text(e.call(t, r, qr([t])))) : Ce(this, (t) => {
    if (!Le(t))
      return;
    t.children.forEach((n) => {
      n.next = n.prev = n.parent = null;
    });
    const r = new ar(`${e}`);
    jt(r, t);
  });
}
function WT() {
  return this._make(ea(this.get()));
}
const QT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _makeDomArray: OT,
  after: wT,
  append: RT,
  appendTo: vT,
  before: FT,
  clone: WT,
  empty: $T,
  html: qT,
  insertAfter: BT,
  insertBefore: UT,
  prepend: LT,
  prependTo: xT,
  remove: HT,
  replaceWith: YT,
  text: GT,
  toString: jT,
  unwrap: MT,
  wrap: DT,
  wrapAll: kT,
  wrapInner: PT
}, Symbol.toStringTag, { value: "Module" }));
function VT(e, t) {
  if (e != null && t != null || // When `prop` is a "plain" object
  typeof e == "object" && !Array.isArray(e))
    return Ce(this, (r, n) => {
      Z(r) && Nc(r, e, t, n);
    });
  if (this.length !== 0)
    return Ic(this[0], e);
}
function Nc(e, t, r, n) {
  if (typeof t == "string") {
    const u = Ic(e), i = typeof r == "function" ? r.call(e, n, u[t]) : r;
    i === "" ? delete u[t] : i != null && (u[t] = i), e.attribs.style = XT(u);
  } else
    typeof t == "object" && Object.keys(t).forEach((u, i) => {
      Nc(e, u, t[u], i);
    });
}
function Ic(e, t) {
  if (!e || !Z(e))
    return;
  const r = KT(e.attribs.style);
  if (typeof t == "string")
    return r[t];
  if (Array.isArray(t)) {
    const n = {};
    return t.forEach((u) => {
      r[u] != null && (n[u] = r[u]);
    }), n;
  }
  return r;
}
function XT(e) {
  return Object.keys(e).reduce((t, r) => `${t}${t ? " " : ""}${r}: ${e[r]};`, "");
}
function KT(e) {
  if (e = (e || "").trim(), !e)
    return {};
  const t = {};
  let r;
  for (const n of e.split(";")) {
    const u = n.indexOf(":");
    if (u < 1 || u === n.length - 1) {
      const i = n.trimEnd();
      i.length > 0 && r !== void 0 && (t[r] += `;${i}`);
    } else
      r = n.slice(0, u).trim(), t[r] = n.slice(u + 1).trim();
  }
  return t;
}
const zT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  css: VT
}, Symbol.toStringTag, { value: "Module" })), rs = "input,select,textarea,keygen", ZT = /%20/g, ns = /\r?\n/g;
function JT() {
  return this.serializeArray().map((r) => `${encodeURIComponent(r.name)}=${encodeURIComponent(r.value)}`).join("&").replace(ZT, "+");
}
function eb() {
  return this.map((e, t) => {
    const r = this._make(t);
    return Z(t) && t.name === "form" ? r.find(rs).toArray() : r.filter(rs).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    // Convert each of the elements to its value(s)
  ).map((e, t) => {
    var r;
    const n = this._make(t), u = n.attr("name"), i = (r = n.val()) !== null && r !== void 0 ? r : "";
    return Array.isArray(i) ? i.map((s) => (
      /*
       * We trim replace any line endings (e.g. `\r` or `\r\n` with `\r\n`) to guarantee consistency across platforms
       * These can occur inside of `<textarea>'s`
       */
      { name: u, value: s.replace(ns, `\r
`) }
    )) : { name: u, value: i.replace(ns, `\r
`) };
  }).toArray();
}
const tb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  serialize: JT,
  serializeArray: eb
}, Symbol.toStringTag, { value: "Module" }));
class rn {
  /**
   * Instance of cheerio. Methods are specified in the modules. Usage of this
   * constructor is not recommended. Please use `$.load` instead.
   *
   * @private
   * @param elements - The new selection.
   * @param root - Sets the root node.
   * @param options - Options for the instance.
   */
  constructor(t, r, n) {
    if (this.length = 0, this.options = n, this._root = r, t) {
      for (let u = 0; u < t.length; u++)
        this[u] = t[u];
      this.length = t.length;
    }
  }
}
rn.prototype.cheerio = "[cheerio object]";
rn.prototype.splice = Array.prototype.splice;
rn.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(rn.prototype, Qm, ST, QT, zT, tb);
function rb(e, t) {
  return function r(n, u, i = !0) {
    if (n == null)
      throw new Error("cheerio.load() expects a string");
    const s = { ...Ba, ...Ju(u) }, c = e(n, s, i, null);
    class l extends rn {
      _make(_, C) {
        const p = h(_, C);
        return p.prevObject = this, p;
      }
      _parse(_, C, p, g) {
        return e(_, C, p, g);
      }
      _render(_) {
        return t(_, this.options);
      }
    }
    function h(T, _, C = c, p) {
      if (T && lt(T))
        return T;
      const g = {
        ...s,
        ...Ju(p)
      }, O = typeof C == "string" ? [e(C, g, !1, null)] : "length" in C ? C : [C], M = lt(O) ? O : new l(O, null, g);
      if (M._root = M, !T)
        return new l(void 0, M, g);
      const Y = typeof T == "string" && ta(T) ? (
        // $(<html>)
        e(T, g, !1, null).children
      ) : nb(T) ? (
        // $(dom)
        [T]
      ) : Array.isArray(T) ? (
        // $([dom])
        T
      ) : void 0, W = new l(Y, M, g);
      if (Y)
        return W;
      if (typeof T != "string")
        throw new Error("Unexpected type of selector");
      let Q = T;
      const k = _ ? typeof _ == "string" ? ta(_) ? (
        // $('li', '<ul>...</ul>')
        new l([e(_, g, !1, null)], M, g)
      ) : (
        // $('li', 'ul')
        (Q = `${_} ${Q}`, M)
      ) : lt(_) ? (
        // $('li', $)
        _
      ) : (
        // $('li', node), $('li', [nodes])
        new l(Array.isArray(_) ? _ : [_], M, g)
      ) : (
        // If we don't have a context, maybe we have a root, from loading
        M
      );
      return k ? k.find(Q) : W;
    }
    return Object.assign(h, Bm, {
      load: r,
      // `_root` and `_options` are used in static methods.
      _root: c,
      _options: s,
      // Add `fn` for plugins
      fn: l.prototype,
      // Add the prototype here to maintain `instanceof` behavior.
      prototype: l.prototype
    }), h;
  };
}
function nb(e) {
  return !!e.name || e.type === "root" || e.type === "text" || e.type === "comment";
}
function ub(e, t, r, n) {
  const u = {
    scriptingEnabled: typeof t.scriptingEnabled == "boolean" ? t.scriptingEnabled : !0,
    treeAdapter: Yt,
    sourceCodeLocationInfo: t.sourceCodeLocationInfo
  };
  return r ? ec(e, u) : tc(n, e, u);
}
const ab = { treeAdapter: Yt };
function ib(e) {
  const t = "length" in e ? e : [e];
  for (let n = 0; n < t.length; n += 1) {
    const u = t[n];
    Rt(u) && Array.prototype.splice.call(t, n, 1, ...u.children);
  }
  let r = "";
  for (let n = 0; n < t.length; n += 1) {
    const u = t[n];
    r += zo(u, ab);
  }
  return r;
}
const sb = yT((e, t, r, n) => t.xmlMode || t._useHtmlParser2 ? Da(e, t) : ub(e, t, r, n)), Sc = rb(sb, (e, t) => t.xmlMode || t._useHtmlParser2 ? sr(e, t) : ib(e));
Sc([]);
class ob {
  constructor(t, r = {}) {
    this.tasks = t, this.options = r;
  }
  async process(t) {
    t = await this.reduce(t, async (n, u) => await u.initialize(await n));
    let r = Xc(t);
    return r = await this.reduce(
      r,
      async (n, u) => await u.preprocess(n)
    ), r = await this.reduce(
      r,
      async (n, u) => await u.process(n)
    ), r = await this.reduce(
      r,
      async (n, u) => await u.postprocess(n)
    ), this.reduce(
      r.html(),
      async (n, u) => await u.transform(n)
    );
  }
  reduce(t, r) {
    return this.tasks.reduce(async (n, u) => await r(await n, u), Promise.resolve(t));
  }
}
function cb() {
  if (this.attr("align"))
    return this.attr("align");
  if (this.css("float"))
    return this.css("float");
}
function lb() {
  return this.attr("height") ? this.attr("height") : this.css("height") || this.css("max-height");
}
function fb() {
  const e = {};
  for (const [t, r] of Object.entries(this.first().css()))
    t.toLowerCase().match(/^margin/) && (e[t.toLowerCase()] = r);
  if (Object.keys(e).length)
    return e.margin ? e.margin : `margin: ${e["margin-top"] ?? "0"} ${e["margin-left"] ?? "0"} ${e["margin-bottom"] ?? "0"} ${e["margin-right"] ?? "0"};`;
}
function db() {
  const e = this.get(0), t = hb(e, e.parent), r = Eb(e, e.parent);
  if (t && r)
    return [t, r];
}
function hb(e, t) {
  return yc(e, t && t.children, -1, (r) => {
    if (r.type === "tag" || Oc(r.data))
      return !1;
    if (vc(r.data))
      return r;
  });
}
function Eb(e, t) {
  return yc(e, t && t.children, 1, (r) => {
    if (r.type === "tag" || vc(r.data))
      return !1;
    if (Oc(r.data))
      return r;
  });
}
function yc(e, t, r, n) {
  if (!t)
    return;
  let u, i = t.indexOf(e);
  for (; u = t[i + r]; ) {
    if (n instanceof Function) {
      const s = n(u, i);
      if (s !== void 0)
        return s;
    }
    i += r;
  }
}
function Oc(e) {
  return e.toString().match(/\[(\s)?if(.+)?>(\s+)?<\/(.+)?/m);
}
function vc(e) {
  return e.toString().match(/\[(\s)?if(.+)?>(.+)?<table.+/m);
}
function mb() {
  const e = {};
  for (const [t, r] of Object.entries(this.first().css()))
    t.toLowerCase().match(/^padding/) && (e[t.toLowerCase()] = r);
  if (Object.keys(e).length)
    return e.padding ? e.padding : `padding: ${e["padding-top"] ?? "0"} ${e["padding-left"] ?? "0"} ${e["padding-bottom"] ?? "0"} ${e["padding-right"] ?? "0"};`;
}
var xc = { exports: {} };
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(q, function() {
    function r(S, x) {
      return function(v) {
        if (Array.isArray(v))
          return v;
      }(S) || function(v, B) {
        var U = v == null ? null : typeof Symbol < "u" && v[Symbol.iterator] || v["@@iterator"];
        if (U != null) {
          var X, j, D, F, le = [], J = !0, De = !1;
          try {
            if (D = (U = U.call(v)).next, B === 0) {
              if (Object(U) !== U)
                return;
              J = !1;
            } else
              for (; !(J = (X = D.call(U)).done) && (le.push(X.value), le.length !== B); J = !0)
                ;
          } catch (Ge) {
            De = !0, j = Ge;
          } finally {
            try {
              if (!J && U.return != null && (F = U.return(), Object(F) !== F))
                return;
            } finally {
              if (De)
                throw j;
            }
          }
          return le;
        }
      }(S, x) || function(v, B) {
        if (v) {
          if (typeof v == "string")
            return n(v, B);
          var U = Object.prototype.toString.call(v).slice(8, -1);
          if (U === "Object" && v.constructor && (U = v.constructor.name), U === "Map" || U === "Set")
            return Array.from(v);
          if (U === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(U))
            return n(v, B);
        }
      }(S, x) || function() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }();
    }
    function n(S, x) {
      (x == null || x > S.length) && (x = S.length);
      for (var v = 0, B = new Array(x); v < x; v++)
        B[v] = S[v];
      return B;
    }
    var u = function(S) {
      return /^\d+$/.test(S);
    }, i = function(S, x, v) {
      return { "flex-grow": S, "flex-shrink": x, "flex-basis": v };
    }, s = function(S) {
      var x, v = S.split(" "), B = v.length, U = r(v, 3), X = U[0], j = U[1], D = U[2];
      return B === 1 ? (x = X) === "initial" ? i("0", "1", "auto") : x === "auto" ? i("1", "1", "auto") : x === "none" ? i("0", "0", "auto") : u(x) ? i(x, "1", "0") : i("1", "1", x) : B === 2 ? function(F, le) {
        return u(le) ? i(F, le, "0") : i(F, "1", le);
      }(X, j) : i(X, j, D);
    }, c = function(S, x, v, B) {
      for (var U = "", X = x.split(" "), j = 0, D = X.length; j < D; j++) {
        var F = X[j];
        v(F) && (U += "".concat(F, " "), x = x.replace(F, ""));
      }
      return B[S] = U ? U.slice(0, -1) : "unset", x = x.replace(/\s{2,}/g, " ").trim();
    }, l = { "xx-small": null, "x-small": null, small: null, medium: null, large: null, "x-large": null, "xx-large": null, larger: null, smaller: null }, h = { normal: null, italic: null, oblique: null }, T = { normal: null, bold: null, lighter: null, bolder: null }, _ = { hidden: null, dotted: null, dashed: null, solid: null, double: null, groove: null, ridge: null, inset: null, outset: null }, C = { thin: null, medium: null, thick: null }, p = { disc: null, circle: null, square: null, decimal: null }, g = { "border-box": null, "padding-box": null, "content-box": null }, O = { "border-box": null, "padding-box": null, "content-box": null }, M = { repeat: null, space: null, round: null, "repeat-x": null, "repeat-y": null, "no-repeat": null }, Y = { inside: null, outside: null }, W = { none: null, forwards: null, backwards: null, both: null }, Q = { normal: null, reverse: null, alternate: null, "alternate-reverse": null }, k = { running: null, paused: null }, R = { top: null, right: null, bottom: null, left: null, center: null }, w = { scroll: null, fixed: null, local: null }, V = { ease: null, "ease-in": null, "ease-out": null, "ease-in-out": null, linear: null, "step-start": null, "step-end": null }, ue = function(S) {
      var x = { "font-size": "unset", "line-height": "unset", "font-weight": "unset", "font-style": "unset", "font-family": "unset" }, v = S.split(" ");
      if (v.length === 1)
        x["font-family"] = v[0];
      else {
        S = function(F, le, J) {
          for (var De = 0, Ge = J.length; De < Ge; De++) {
            var be = J[De], Ae = be.indexOf("/");
            if (Ae !== -1) {
              le["font-size"] = be.slice(0, Ae), le["line-height"] = be.slice(Ae + 1), F = F.replace(be, "");
              break;
            }
            if (l.hasOwnProperty(be) || /^\d+(.\d+)?[a-z%]+$/.test(be)) {
              le["font-size"] = be, F = F.replace(be, "");
              break;
            }
          }
          return F.replace(/\s{2,}/g, " ").trim();
        }(S, x, v);
        var B = Object.keys(x);
        B.splice(0, 2);
        for (var U = { "font-weight": function(F) {
          return T.hasOwnProperty(F) || /^\d+(\.\d+)?$/.test(F);
        }, "font-style": function(F) {
          return h.hasOwnProperty(F);
        }, "font-family": function(F) {
          return F;
        } }, X = 0, j = B.length; X < j; X++) {
          var D = B[X];
          S && (S = c(D, S, U[D], x));
        }
      }
      return x["font-weight"] === "normal" && x["font-style"] === "unset" && (x["font-style"] = "normal"), x;
    }, oe = function(S, x, v) {
      S = function(U) {
        return U.replace(/\s?(\d*\.\d+)s/g, function(X, j) {
          return j[0] === "." && (j = "0".concat(j)), "".concat(1e3 * Number(j), "ms");
        });
      }(S);
      var B = 0;
      return S = S.replace(/\s?(\d+m?s)/g, function(U, X) {
        return B === 2 || (++B === 1 ? x["".concat(v, "-duration")] = X : B === 2 && (x["".concat(v, "-delay")] = X)), "";
      });
    }, Te = function(S) {
      return Y.hasOwnProperty(S);
    }, Ze = function(S, x, v) {
      var B = x.split(","), U = B.length, X = r(B, 3), j = X[0], D = X[1], F = X[2];
      U === 1 ? v["".concat(S, "X")] = v["".concat(S, "Y")] = j : U === 2 ? (v["".concat(S, "X")] = j, v["".concat(S, "Y")] = D) : (v["".concat(S, "X")] = j, v["".concat(S, "Y")] = D, v["".concat(S, "Z")] = F);
    }, z = { translate: function(S, x) {
      Ze("translate", S, x);
    }, translate3d: function(S, x) {
      Ze("translate", S, x);
    }, scale: function(S, x) {
      Ze("scale", S, x);
    }, skew: function(S, x) {
      Ze("skew", S, x);
    }, rotate: function(S, x) {
      Ze("rotate", S, x);
    } }, me = function(S) {
      var x = { "background-repeat": "unset", "background-origin": "unset", "background-clip": "unset", "background-attachment": "unset", "background-image": "unset", "background-position": "unset", "background-size": "unset", "background-color": "unset" }, v = { "background-repeat": function(D) {
        return M.hasOwnProperty(D);
      }, "background-origin": function(D) {
        return O.hasOwnProperty(D);
      }, "background-clip": function(D) {
        return g.hasOwnProperty(D);
      }, "background-attachment": function(D) {
        return w.hasOwnProperty(D);
      }, "background-image": function(D) {
        return /url\(.*?\)/.test(D);
      } }, B = Object.keys(x);
      B.splice(5, 3);
      for (var U = 0, X = B.length; U < X; U++) {
        var j = B[U];
        S && (S = c(j, S, v[j], x));
      }
      return S && function(D, F) {
        var le = D.split(" "), J = D.indexOf("/");
        if (J !== -1) {
          F["background-position"] = D.slice(0, J);
          var De = r((D = D.slice(J + 1)).split(" "), 3), Ge = De[0], be = De[1], Ae = De[2];
          be ? /\d+.*/.test(be) || be === "auto" ? (F["background-size"] = "".concat(Ge, " ").concat(be), Ae && (F["background-color"] = Ae)) : (F["background-size"] = Ge, F["background-color"] = be) : F["background-size"] = Ge;
        } else {
          var Ke = r(le, 1)[0];
          F[le.length === 1 && (R.hasOwnProperty(Ke) || /^\d+/.test(Ke)) ? "background-position" : "background-color"] = Ke;
        }
      }(S, x), function(D) {
        var F = D["background-origin"], le = D["background-clip"];
        if (F !== "unset" && le === "unset") {
          var J = r(F.split(" "), 2), De = J[0], Ge = J[1];
          Ge ? (D["background-origin"] = De, D["background-clip"] = Ge) : D["background-clip"] = De;
        }
      }(x), x;
    }, ge = function(S) {
      return _.hasOwnProperty(S);
    }, de = function(S, x) {
      var v, B = {}, U = S.split(" "), X = U.length;
      if (B["".concat(x, "-width")] = "unset", B["".concat(x, "-style")] = "unset", B["".concat(x, "-color")] = "unset", X < 3)
        return B;
      for (var j = 0; j < X; j++) {
        var D = U[j];
        v = D, C.hasOwnProperty(v) || /^[0-9]/.test(v[0]) ? B["".concat(x, "-width")] = D : ge(D) ? B["".concat(x, "-style")] = D : B["".concat(x, "-color")] = D;
      }
      return B;
    }, se = function(S, x, v) {
      var B = {}, U = S.split(" "), X = U.length, j = r(U, 4), D = j[0], F = j[1], le = j[2], J = j[3];
      return v = v ? "-".concat(v) : "", X === 1 ? (B["".concat(x, "-top").concat(v)] = D, B["".concat(x, "-right").concat(v)] = D, B["".concat(x, "-bottom").concat(v)] = D, B["".concat(x, "-left").concat(v)] = D) : X === 2 ? (B["".concat(x, "-top").concat(v)] = D, B["".concat(x, "-right").concat(v)] = F, B["".concat(x, "-bottom").concat(v)] = D, B["".concat(x, "-left").concat(v)] = F) : X === 3 ? (B["".concat(x, "-top").concat(v)] = D, B["".concat(x, "-right").concat(v)] = F, B["".concat(x, "-bottom").concat(v)] = le, B["".concat(x, "-left").concat(v)] = F) : (B["".concat(x, "-top").concat(v)] = D, B["".concat(x, "-right").concat(v)] = F, B["".concat(x, "-bottom").concat(v)] = le, B["".concat(x, "-left").concat(v)] = J), B;
    }, re = { margin: function(S) {
      return se(S, "margin");
    }, padding: function(S) {
      return se(S, "padding");
    }, border: function(S) {
      return de(S, "border");
    }, "border-top": function(S) {
      return de(S, "border-top");
    }, "border-right": function(S) {
      return de(S, "border-right");
    }, "border-bottom": function(S) {
      return de(S, "border-bottom");
    }, "border-left": function(S) {
      return de(S, "border-left");
    }, "border-width": function(S) {
      return se(S, "border", "width");
    }, "border-style": function(S) {
      return se(S, "border", "style");
    }, "border-color": function(S) {
      return se(S, "border", "color");
    }, "border-radius": function(S) {
      return function(x) {
        var v = {}, B = x.split(" "), U = B.length, X = r(B, 4), j = X[0], D = X[1], F = X[2], le = X[3];
        return U === 1 ? (v["border-top-left-radius"] = j, v["border-top-right-radius"] = j, v["border-bottom-right-radius"] = j, v["border-bottom-left-radius"] = j) : U === 2 ? (v["border-top-left-radius"] = j, v["border-top-right-radius"] = D, v["border-bottom-right-radius"] = j, v["border-bottom-left-radius"] = D) : (v["border-top-left-radius"] = j, v["border-top-right-radius"] = D, v["border-bottom-right-radius"] = F, v["border-bottom-left-radius"] = le), v;
      }(S);
    }, "list-style": function(S) {
      return function(x) {
        for (var v, B = { "list-style-type": "unset", "list-style-position": "unset", "list-style-image": "unset" }, U = x.split(" "), X = U.length, j = 0; j < X; j++) {
          var D = U[j];
          v = D, p.hasOwnProperty(v) ? B["list-style-type"] = D : Te(D) ? B["list-style-position"] = D : D === "none" ? B["list-style-type"] === "unset" ? B["list-style-type"] = "none" : B["list-style-image"] = "none" : B["list-style-image"] = D;
        }
        return B;
      }(S);
    }, flex: function(S) {
      return s(S);
    }, animation: function(S) {
      return function(x) {
        var v = { "animation-duration": "unset", "animation-delay": "unset", "animation-timing-function": "unset", "animation-iteration-count": "unset", "animation-direction": "unset", "animation-fill-mode": "unset", "animation-play-state": "unset", "animation-name": "unset" }, B = { "animation-timing-function": function(F) {
          return V.hasOwnProperty(F) || /(.*?\(.*?\))/.test(F);
        }, "animation-iteration-count": function(F) {
          return F === "infinite" || !isNaN(Number(F));
        }, "animation-direction": function(F) {
          return Q.hasOwnProperty(F);
        }, "animation-fill-mode": function(F) {
          return W.hasOwnProperty(F);
        }, "animation-play-state": function(F) {
          return k.hasOwnProperty(F);
        }, "animation-name": function(F) {
          return F;
        } };
        x = oe(x, v, "animation");
        var U = Object.keys(v);
        U.splice(0, 2);
        for (var X = 0, j = U.length; X < j; X++) {
          var D = U[X];
          x && (x = c(D, x, B[D], v));
        }
        return v;
      }(S);
    }, background: function(S) {
      return me(S);
    }, font: function(S) {
      return ue(S);
    }, transition: function(S) {
      return function(x) {
        var v = { "transition-duration": "unset", "transition-delay": "unset", "transition-timing-function": "unset", "transition-property": "unset" }, B = { "transition-timing-function": function(F) {
          return V.hasOwnProperty(F) || /(.*?\(.*?\))/.test(F);
        }, "transition-property": function(F) {
          return F;
        } };
        x = oe(x, v, "transition");
        var U = Object.keys(v);
        U.splice(0, 2);
        for (var X = 0, j = U.length; X < j; X++) {
          var D = U[X];
          x && (x = c(D, x, B[D], v));
        }
        return v;
      }(S);
    }, transform: function(S) {
      return function(x) {
        if (x === "none")
          return { transform: "none" };
        var v = {};
        return x.replace(/(.*?)\((.*?)\)/, function(B, U, X) {
          var j = z[U];
          j ? j(X, v) : v[U] = X;
        }), v;
      }(S);
    } };
    return function(S, x) {
      x = x.replace(/\s{2,}/g, " ").replace(/\s?([,/])\s?/g, function(B, U) {
        return U;
      }).replace(/\s?,\s?/g, ",").replace(/\(\s?/g, "(").replace(/\s?\)/g, ")").replace(/\s?\/\s?/g, "/").trim();
      var v = re[S];
      return v ? v(x) : null;
    };
  });
})(xc);
var Tb = xc.exports;
const bb = /* @__PURE__ */ Er(Tb);
var Rc = { exports: {} };
/*!
 * https://github.com/gilmoreorless/css-shorthand-properties
 * MIT Licensed: https://gilmoreorless.mit-license.org/
 */
(function(e) {
  (function(t) {
    var r = t.shorthandProperties = {
      // CSS 2.1: https://www.w3.org/TR/CSS2/propidx.html
      "list-style": ["-type", "-position", "-image"],
      margin: ["-top", "-right", "-bottom", "-left"],
      outline: ["-width", "-style", "-color"],
      padding: ["-top", "-right", "-bottom", "-left"],
      // CSS Backgrounds and Borders Module Level 3: https://www.w3.org/TR/css3-background/
      background: ["-image", "-position", "-size", "-repeat", "-origin", "-clip", "-attachment", "-color"],
      "background-position": ["-x", "-y"],
      // Not found in the spec, but already implemented by every stable browser
      border: ["-width", "-style", "-color"],
      "border-color": ["border-top-color", "border-right-color", "border-bottom-color", "border-left-color"],
      "border-style": ["border-top-style", "border-right-style", "border-bottom-style", "border-left-style"],
      "border-width": ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"],
      "border-top": ["-width", "-style", "-color"],
      "border-right": ["-width", "-style", "-color"],
      "border-bottom": ["-width", "-style", "-color"],
      "border-left": ["-width", "-style", "-color"],
      "border-radius": ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"],
      "border-image": ["-source", "-slice", "-width", "-outset", "-repeat"],
      // CSS Fonts Module Level 3: https://www.w3.org/TR/css3-fonts/
      font: ["-style", "-variant", "-weight", "-stretch", "-size", "line-height", "-family"],
      "font-variant": ["-ligatures", "-alternates", "-caps", "-numeric", "-east-asian"],
      // CSS Flexible Box Layout Module Level 1: https://www.w3.org/TR/css3-flexbox-1/
      flex: ["-grow", "-shrink", "-basis"],
      "flex-flow": ["flex-direction", "flex-wrap"],
      // CSS Grid Layout Module Level 1: https://www.w3.org/TR/css-grid-1/
      grid: ["-template-rows", "-template-columns", "-template-areas", "-auto-rows", "-auto-columns", "-auto-flow"],
      "grid-template": ["-rows", "-columns", "-areas"],
      "grid-row": ["-start", "-end"],
      "grid-column": ["-start", "-end"],
      "grid-area": ["grid-row-start", "grid-column-start", "grid-row-end", "grid-column-end"],
      "grid-gap": ["grid-row-gap", "grid-column-gap"],
      // CSS Masking Module Level 1: https://www.w3.org/TR/css-masking/
      mask: ["-image", "-mode", "-position", "-size", "-repeat", "-origin", "-clip"],
      "mask-border": ["-source", "-slice", "-width", "-outset", "-repeat", "-mode"],
      // CSS Multi-column Layout Module: https://www.w3.org/TR/css3-multicol/
      columns: ["column-width", "column-count"],
      "column-rule": ["-width", "-style", "-color"],
      // CSS Scroll Snap Module Level 1: https://www.w3.org/TR/css-scroll-snap-1/
      "scroll-padding": ["-top", "-right", "-bottom", "-left"],
      "scroll-padding-block": ["-start", "-end"],
      "scroll-padding-inline": ["-start", "-end"],
      "scroll-snap-margin": ["-top", "-right", "-bottom", "-left"],
      "scroll-snap-margin-block": ["-start", "-end"],
      "scroll-snap-margin-inline": ["-start", "-end"],
      // CSS Speech Module: https://www.w3.org/TR/css3-speech/
      cue: ["-before", "-after"],
      pause: ["-before", "-after"],
      rest: ["-before", "-after"],
      // CSS Text Decoration Module Level 3: https://www.w3.org/TR/css-text-decor-3/
      "text-decoration": ["-line", "-style", "-color"],
      "text-emphasis": ["-style", "-color"],
      // CSS Animations (WD): https://www.w3.org/TR/css3-animations
      animation: ["-name", "-duration", "-timing-function", "-delay", "-iteration-count", "-direction", "-fill-mode", "-play-state"],
      // CSS Transitions (WD): https://www.w3.org/TR/css3-transitions/
      transition: ["-property", "-duration", "-timing-function", "-delay"]
    };
    t.isShorthand = function(n) {
      return r.hasOwnProperty(n);
    }, t.expand = function(n, u) {
      return r.hasOwnProperty(n) ? r[n].map(function(i) {
        var s = i.substr(0, 1) === "-" ? n + i : i;
        return u ? t.expand(s, u) : s;
      }) : [n];
    };
  })(function(t) {
    return e.exports !== void 0 ? e.exports : t.cssShorthandProps = {};
  }(q));
})(Rc);
var pb = Rc.exports;
const us = /* @__PURE__ */ Er(pb);
var gb = 1 / 0, _b = "[object Symbol]", Ab = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Cb = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, nu = "\\ud800-\\udfff", Lc = "\\u0300-\\u036f\\ufe20-\\ufe23", Dc = "\\u20d0-\\u20f0", Pc = "\\u2700-\\u27bf", Mc = "a-z\\xdf-\\xf6\\xf8-\\xff", Nb = "\\xac\\xb1\\xd7\\xf7", Ib = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Sb = "\\u2000-\\u206f", yb = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", kc = "A-Z\\xc0-\\xd6\\xd8-\\xde", wc = "\\ufe0e\\ufe0f", Bc = Nb + Ib + Sb + yb, qa = "['’]", Ob = "[" + nu + "]", as = "[" + Bc + "]", Fn = "[" + Lc + Dc + "]", Fc = "\\d+", vb = "[" + Pc + "]", Uc = "[" + Mc + "]", Hc = "[^" + nu + Bc + Fc + Pc + Mc + kc + "]", ra = "\\ud83c[\\udffb-\\udfff]", xb = "(?:" + Fn + "|" + ra + ")", Yc = "[^" + nu + "]", ja = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ga = "[\\ud800-\\udbff][\\udc00-\\udfff]", Jt = "[" + kc + "]", $c = "\\u200d", is = "(?:" + Uc + "|" + Hc + ")", Rb = "(?:" + Jt + "|" + Hc + ")", ss = "(?:" + qa + "(?:d|ll|m|re|s|t|ve))?", os = "(?:" + qa + "(?:D|LL|M|RE|S|T|VE))?", qc = xb + "?", jc = "[" + wc + "]?", Lb = "(?:" + $c + "(?:" + [Yc, ja, Ga].join("|") + ")" + jc + qc + ")*", Gc = jc + qc + Lb, Db = "(?:" + [vb, ja, Ga].join("|") + ")" + Gc, Pb = "(?:" + [Yc + Fn + "?", Fn, ja, Ga, Ob].join("|") + ")", Mb = RegExp(qa, "g"), kb = RegExp(Fn, "g"), wb = RegExp(ra + "(?=" + ra + ")|" + Pb + Gc, "g"), Bb = RegExp([
  Jt + "?" + Uc + "+" + ss + "(?=" + [as, Jt, "$"].join("|") + ")",
  Rb + "+" + os + "(?=" + [as, Jt + is, "$"].join("|") + ")",
  Jt + "?" + is + "+" + ss,
  Jt + "+" + os,
  Fc,
  Db
].join("|"), "g"), Fb = RegExp("[" + $c + nu + Lc + Dc + wc + "]"), Ub = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Hb = {
  // Latin-1 Supplement block.
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  // Latin Extended-A block.
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "ss"
}, Yb = typeof q == "object" && q && q.Object === Object && q, $b = typeof self == "object" && self && self.Object === Object && self, qb = Yb || $b || Function("return this")();
function jb(e, t, r, n) {
  var u = -1, i = e ? e.length : 0;
  for (n && i && (r = e[++u]); ++u < i; )
    r = t(r, e[u], u, e);
  return r;
}
function Gb(e) {
  return e.split("");
}
function Wb(e) {
  return e.match(Ab) || [];
}
function Qb(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var Vb = Qb(Hb);
function Wc(e) {
  return Fb.test(e);
}
function Xb(e) {
  return Ub.test(e);
}
function Kb(e) {
  return Wc(e) ? zb(e) : Gb(e);
}
function zb(e) {
  return e.match(wb) || [];
}
function Zb(e) {
  return e.match(Bb) || [];
}
var Jb = Object.prototype, ep = Jb.toString, cs = qb.Symbol, ls = cs ? cs.prototype : void 0, fs = ls ? ls.toString : void 0;
function tp(e, t, r) {
  var n = -1, u = e.length;
  t < 0 && (t = -t > u ? 0 : u + t), r = r > u ? u : r, r < 0 && (r += u), u = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var i = Array(u); ++n < u; )
    i[n] = e[n + t];
  return i;
}
function rp(e) {
  if (typeof e == "string")
    return e;
  if (sp(e))
    return fs ? fs.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -gb ? "-0" : t;
}
function np(e, t, r) {
  var n = e.length;
  return r = r === void 0 ? n : r, !t && r >= n ? e : tp(e, t, r);
}
function up(e) {
  return function(t) {
    t = uu(t);
    var r = Wc(t) ? Kb(t) : void 0, n = r ? r[0] : t.charAt(0), u = r ? np(r, 1).join("") : t.slice(1);
    return n[e]() + u;
  };
}
function ap(e) {
  return function(t) {
    return jb(dp(lp(t).replace(Mb, "")), e, "");
  };
}
function ip(e) {
  return !!e && typeof e == "object";
}
function sp(e) {
  return typeof e == "symbol" || ip(e) && ep.call(e) == _b;
}
function uu(e) {
  return e == null ? "" : rp(e);
}
var op = ap(function(e, t, r) {
  return t = t.toLowerCase(), e + (r ? cp(t) : t);
});
function cp(e) {
  return fp(uu(e).toLowerCase());
}
function lp(e) {
  return e = uu(e), e && e.replace(Cb, Vb).replace(kb, "");
}
var fp = up("toUpperCase");
function dp(e, t, r) {
  return e = uu(e), t = r ? void 0 : t, t === void 0 ? Xb(e) ? Zb(e) : Wb(e) : e.match(t) || [];
}
var hp = op;
const Ep = /* @__PURE__ */ Er(hp);
var Un = { exports: {} };
Un.exports;
(function(e, t) {
  var r = 200, n = "Expected a function", u = "__lodash_hash_undefined__", i = 1, s = 2, c = 1 / 0, l = 9007199254740991, h = "[object Arguments]", T = "[object Array]", _ = "[object Boolean]", C = "[object Date]", p = "[object Error]", g = "[object Function]", O = "[object GeneratorFunction]", M = "[object Map]", Y = "[object Number]", W = "[object Object]", Q = "[object Promise]", k = "[object RegExp]", R = "[object Set]", w = "[object String]", V = "[object Symbol]", ue = "[object WeakMap]", oe = "[object ArrayBuffer]", Te = "[object DataView]", Ze = "[object Float32Array]", z = "[object Float64Array]", me = "[object Int8Array]", ge = "[object Int16Array]", de = "[object Int32Array]", se = "[object Uint8Array]", re = "[object Uint8ClampedArray]", S = "[object Uint16Array]", x = "[object Uint32Array]", v = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, B = /^\w*$/, U = /^\./, X = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, j = /[\\^$.*+?()[\]{}|]/g, D = /\\(\\)?/g, F = /^\[object .+?Constructor\]$/, le = /^(?:0|[1-9]\d*)$/, J = {};
  J[Ze] = J[z] = J[me] = J[ge] = J[de] = J[se] = J[re] = J[S] = J[x] = !0, J[h] = J[T] = J[oe] = J[_] = J[Te] = J[C] = J[p] = J[g] = J[M] = J[Y] = J[W] = J[k] = J[R] = J[w] = J[ue] = !1;
  var De = typeof q == "object" && q && q.Object === Object && q, Ge = typeof self == "object" && self && self.Object === Object && self, be = De || Ge || Function("return this")(), Ae = t && !t.nodeType && t, Ke = Ae && !0 && e && !e.nodeType && e, Oe = Ke && Ke.exports === Ae, Fe = Oe && De.process, ve = function() {
    try {
      return Fe && Fe.binding("util");
    } catch {
    }
  }(), He = ve && ve.isTypedArray;
  function Cr(o, E) {
    for (var N = -1, P = E.length, ee = o.length; ++N < P; )
      o[ee + N] = E[N];
    return o;
  }
  function ou(o, E) {
    for (var N = -1, P = o ? o.length : 0; ++N < P; )
      if (E(o[N], N, o))
        return !0;
    return !1;
  }
  function Xt(o) {
    return function(E) {
      return E == null ? void 0 : E[o];
    };
  }
  function ht(o, E) {
    for (var N = -1, P = Array(o); ++N < o; )
      P[N] = E(N);
    return P;
  }
  function Kc(o) {
    return function(E) {
      return o(E);
    };
  }
  function zc(o, E) {
    return o == null ? void 0 : o[E];
  }
  function cu(o) {
    var E = !1;
    if (o != null && typeof o.toString != "function")
      try {
        E = !!(o + "");
      } catch {
      }
    return E;
  }
  function Zc(o) {
    var E = -1, N = Array(o.size);
    return o.forEach(function(P, ee) {
      N[++E] = [ee, P];
    }), N;
  }
  function lu(o, E) {
    return function(N) {
      return o(E(N));
    };
  }
  function Jc(o) {
    var E = -1, N = Array(o.size);
    return o.forEach(function(P) {
      N[++E] = P;
    }), N;
  }
  var e0 = Array.prototype, t0 = Function.prototype, un = Object.prototype, fu = be["__core-js_shared__"], Wa = function() {
    var o = /[^.]+$/.exec(fu && fu.keys && fu.keys.IE_PROTO || "");
    return o ? "Symbol(src)_1." + o : "";
  }(), Qa = t0.toString, ot = un.hasOwnProperty, Kt = un.toString, r0 = RegExp(
    "^" + Qa.call(ot).replace(j, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Va = be.Symbol, Xa = be.Uint8Array, n0 = lu(Object.getPrototypeOf, Object), u0 = un.propertyIsEnumerable, a0 = e0.splice, du = Object.getOwnPropertySymbols, i0 = lu(Object.keys, Object), hu = zt(be, "DataView"), Nr = zt(be, "Map"), Eu = zt(be, "Promise"), mu = zt(be, "Set"), Tu = zt(be, "WeakMap"), Ir = zt(Object, "create"), s0 = Mt(hu), o0 = Mt(Nr), c0 = Mt(Eu), l0 = Mt(mu), f0 = Mt(Tu), an = Va ? Va.prototype : void 0, bu = an ? an.valueOf : void 0, Ka = an ? an.toString : void 0;
  function Pt(o) {
    var E = -1, N = o ? o.length : 0;
    for (this.clear(); ++E < N; ) {
      var P = o[E];
      this.set(P[0], P[1]);
    }
  }
  function d0() {
    this.__data__ = Ir ? Ir(null) : {};
  }
  function h0(o) {
    return this.has(o) && delete this.__data__[o];
  }
  function E0(o) {
    var E = this.__data__;
    if (Ir) {
      var N = E[o];
      return N === u ? void 0 : N;
    }
    return ot.call(E, o) ? E[o] : void 0;
  }
  function m0(o) {
    var E = this.__data__;
    return Ir ? E[o] !== void 0 : ot.call(E, o);
  }
  function T0(o, E) {
    var N = this.__data__;
    return N[o] = Ir && E === void 0 ? u : E, this;
  }
  Pt.prototype.clear = d0, Pt.prototype.delete = h0, Pt.prototype.get = E0, Pt.prototype.has = m0, Pt.prototype.set = T0;
  function Et(o) {
    var E = -1, N = o ? o.length : 0;
    for (this.clear(); ++E < N; ) {
      var P = o[E];
      this.set(P[0], P[1]);
    }
  }
  function b0() {
    this.__data__ = [];
  }
  function p0(o) {
    var E = this.__data__, N = on(E, o);
    if (N < 0)
      return !1;
    var P = E.length - 1;
    return N == P ? E.pop() : a0.call(E, N, 1), !0;
  }
  function g0(o) {
    var E = this.__data__, N = on(E, o);
    return N < 0 ? void 0 : E[N][1];
  }
  function _0(o) {
    return on(this.__data__, o) > -1;
  }
  function A0(o, E) {
    var N = this.__data__, P = on(N, o);
    return P < 0 ? N.push([o, E]) : N[P][1] = E, this;
  }
  Et.prototype.clear = b0, Et.prototype.delete = p0, Et.prototype.get = g0, Et.prototype.has = _0, Et.prototype.set = A0;
  function mt(o) {
    var E = -1, N = o ? o.length : 0;
    for (this.clear(); ++E < N; ) {
      var P = o[E];
      this.set(P[0], P[1]);
    }
  }
  function C0() {
    this.__data__ = {
      hash: new Pt(),
      map: new (Nr || Et)(),
      string: new Pt()
    };
  }
  function N0(o) {
    return cn(this, o).delete(o);
  }
  function I0(o) {
    return cn(this, o).get(o);
  }
  function S0(o) {
    return cn(this, o).has(o);
  }
  function y0(o, E) {
    return cn(this, o).set(o, E), this;
  }
  mt.prototype.clear = C0, mt.prototype.delete = N0, mt.prototype.get = I0, mt.prototype.has = S0, mt.prototype.set = y0;
  function sn(o) {
    var E = -1, N = o ? o.length : 0;
    for (this.__data__ = new mt(); ++E < N; )
      this.add(o[E]);
  }
  function O0(o) {
    return this.__data__.set(o, u), this;
  }
  function v0(o) {
    return this.__data__.has(o);
  }
  sn.prototype.add = sn.prototype.push = O0, sn.prototype.has = v0;
  function Tt(o) {
    this.__data__ = new Et(o);
  }
  function x0() {
    this.__data__ = new Et();
  }
  function R0(o) {
    return this.__data__.delete(o);
  }
  function L0(o) {
    return this.__data__.get(o);
  }
  function D0(o) {
    return this.__data__.has(o);
  }
  function P0(o, E) {
    var N = this.__data__;
    if (N instanceof Et) {
      var P = N.__data__;
      if (!Nr || P.length < r - 1)
        return P.push([o, E]), this;
      N = this.__data__ = new mt(P);
    }
    return N.set(o, E), this;
  }
  Tt.prototype.clear = x0, Tt.prototype.delete = R0, Tt.prototype.get = L0, Tt.prototype.has = D0, Tt.prototype.set = P0;
  function za(o, E) {
    var N = Ct(o) || ii(o) ? ht(o.length, String) : [], P = N.length, ee = !!P;
    for (var G in o)
      (E || ot.call(o, G)) && !(ee && (G == "length" || ti(G, P))) && N.push(G);
    return N;
  }
  function on(o, E) {
    for (var N = o.length; N--; )
      if (ai(o[N][0], E))
        return N;
    return -1;
  }
  function Za(o, E) {
    E = ln(E, o) ? [E] : Ja(E);
    for (var N = 0, P = E.length; o != null && N < P; )
      o = o[fn(E[N++])];
    return N && N == P ? o : void 0;
  }
  function M0(o, E, N) {
    var P = E(o);
    return Ct(o) ? P : Cr(P, N(o));
  }
  function k0(o) {
    return Kt.call(o);
  }
  function w0(o, E) {
    return o != null && E in Object(o);
  }
  function pu(o, E, N, P, ee) {
    return o === E ? !0 : o == null || E == null || !Sr(o) && !dn(E) ? o !== o && E !== E : B0(o, E, pu, N, P, ee);
  }
  function B0(o, E, N, P, ee, G) {
    var fe = Ct(o), pe = Ct(E), Se = T, Pe = T;
    fe || (Se = At(o), Se = Se == h ? W : Se), pe || (Pe = At(E), Pe = Pe == h ? W : Pe);
    var Ye = Se == W && !cu(o), We = Pe == W && !cu(E), Me = Se == Pe;
    if (Me && !Ye)
      return G || (G = new Tt()), fe || sl(o) ? ei(o, E, N, P, ee, G) : X0(o, E, Se, N, P, ee, G);
    if (!(ee & s)) {
      var Je = Ye && ot.call(o, "__wrapped__"), et = We && ot.call(E, "__wrapped__");
      if (Je || et) {
        var Nt = Je ? o.value() : o, bt = et ? E.value() : E;
        return G || (G = new Tt()), N(Nt, bt, P, ee, G);
      }
    }
    return Me ? (G || (G = new Tt()), K0(o, E, N, P, ee, G)) : !1;
  }
  function F0(o, E, N, P) {
    var ee = N.length, G = ee, fe = !P;
    if (o == null)
      return !G;
    for (o = Object(o); ee--; ) {
      var pe = N[ee];
      if (fe && pe[2] ? pe[1] !== o[pe[0]] : !(pe[0] in o))
        return !1;
    }
    for (; ++ee < G; ) {
      pe = N[ee];
      var Se = pe[0], Pe = o[Se], Ye = pe[1];
      if (fe && pe[2]) {
        if (Pe === void 0 && !(Se in o))
          return !1;
      } else {
        var We = new Tt();
        if (P)
          var Me = P(Pe, Ye, Se, o, E, We);
        if (!(Me === void 0 ? pu(Ye, Pe, P, i | s, We) : Me))
          return !1;
      }
    }
    return !0;
  }
  function U0(o) {
    if (!Sr(o) || nl(o))
      return !1;
    var E = si(o) || cu(o) ? r0 : F;
    return E.test(Mt(o));
  }
  function H0(o) {
    return dn(o) && Au(o.length) && !!J[Kt.call(o)];
  }
  function Y0(o) {
    return typeof o == "function" ? o : o == null ? hl : typeof o == "object" ? Ct(o) ? G0(o[0], o[1]) : j0(o) : El(o);
  }
  function $0(o) {
    if (!ri(o))
      return i0(o);
    var E = [];
    for (var N in Object(o))
      ot.call(o, N) && N != "constructor" && E.push(N);
    return E;
  }
  function q0(o) {
    if (!Sr(o))
      return ul(o);
    var E = ri(o), N = [];
    for (var P in o)
      P == "constructor" && (E || !ot.call(o, P)) || N.push(P);
    return N;
  }
  function j0(o) {
    var E = Z0(o);
    return E.length == 1 && E[0][2] ? ui(E[0][0], E[0][1]) : function(N) {
      return N === o || F0(N, o, E);
    };
  }
  function G0(o, E) {
    return ln(o) && ni(E) ? ui(fn(o), E) : function(N) {
      var P = cl(N, o);
      return P === void 0 && P === E ? ll(N, o) : pu(E, P, void 0, i | s);
    };
  }
  function W0(o, E, N) {
    for (var P = -1, ee = E.length, G = {}; ++P < ee; ) {
      var fe = E[P], pe = o[fe];
      N(pe, fe) && (G[fe] = pe);
    }
    return G;
  }
  function Q0(o) {
    return function(E) {
      return Za(E, o);
    };
  }
  function V0(o) {
    if (typeof o == "string")
      return o;
    if (Cu(o))
      return Ka ? Ka.call(o) : "";
    var E = o + "";
    return E == "0" && 1 / o == -c ? "-0" : E;
  }
  function Ja(o) {
    return Ct(o) ? o : al(o);
  }
  function ei(o, E, N, P, ee, G) {
    var fe = ee & s, pe = o.length, Se = E.length;
    if (pe != Se && !(fe && Se > pe))
      return !1;
    var Pe = G.get(o);
    if (Pe && G.get(E))
      return Pe == E;
    var Ye = -1, We = !0, Me = ee & i ? new sn() : void 0;
    for (G.set(o, E), G.set(E, o); ++Ye < pe; ) {
      var Je = o[Ye], et = E[Ye];
      if (P)
        var Nt = fe ? P(et, Je, Ye, E, o, G) : P(Je, et, Ye, o, E, G);
      if (Nt !== void 0) {
        if (Nt)
          continue;
        We = !1;
        break;
      }
      if (Me) {
        if (!ou(E, function(bt, kt) {
          if (!Me.has(kt) && (Je === bt || N(Je, bt, P, ee, G)))
            return Me.add(kt);
        })) {
          We = !1;
          break;
        }
      } else if (!(Je === et || N(Je, et, P, ee, G))) {
        We = !1;
        break;
      }
    }
    return G.delete(o), G.delete(E), We;
  }
  function X0(o, E, N, P, ee, G, fe) {
    switch (N) {
      case Te:
        if (o.byteLength != E.byteLength || o.byteOffset != E.byteOffset)
          return !1;
        o = o.buffer, E = E.buffer;
      case oe:
        return !(o.byteLength != E.byteLength || !P(new Xa(o), new Xa(E)));
      case _:
      case C:
      case Y:
        return ai(+o, +E);
      case p:
        return o.name == E.name && o.message == E.message;
      case k:
      case w:
        return o == E + "";
      case M:
        var pe = Zc;
      case R:
        var Se = G & s;
        if (pe || (pe = Jc), o.size != E.size && !Se)
          return !1;
        var Pe = fe.get(o);
        if (Pe)
          return Pe == E;
        G |= i, fe.set(o, E);
        var Ye = ei(pe(o), pe(E), P, ee, G, fe);
        return fe.delete(o), Ye;
      case V:
        if (bu)
          return bu.call(o) == bu.call(E);
    }
    return !1;
  }
  function K0(o, E, N, P, ee, G) {
    var fe = ee & s, pe = Nu(o), Se = pe.length, Pe = Nu(E), Ye = Pe.length;
    if (Se != Ye && !fe)
      return !1;
    for (var We = Se; We--; ) {
      var Me = pe[We];
      if (!(fe ? Me in E : ot.call(E, Me)))
        return !1;
    }
    var Je = G.get(o);
    if (Je && G.get(E))
      return Je == E;
    var et = !0;
    G.set(o, E), G.set(E, o);
    for (var Nt = fe; ++We < Se; ) {
      Me = pe[We];
      var bt = o[Me], kt = E[Me];
      if (P)
        var ci = fe ? P(kt, bt, Me, E, o, G) : P(bt, kt, Me, o, E, G);
      if (!(ci === void 0 ? bt === kt || N(bt, kt, P, ee, G) : ci)) {
        et = !1;
        break;
      }
      Nt || (Nt = Me == "constructor");
    }
    if (et && !Nt) {
      var hn = o.constructor, En = E.constructor;
      hn != En && "constructor" in o && "constructor" in E && !(typeof hn == "function" && hn instanceof hn && typeof En == "function" && En instanceof En) && (et = !1);
    }
    return G.delete(o), G.delete(E), et;
  }
  function z0(o) {
    return M0(o, fl, el);
  }
  function cn(o, E) {
    var N = o.__data__;
    return rl(E) ? N[typeof E == "string" ? "string" : "hash"] : N.map;
  }
  function Z0(o) {
    for (var E = Nu(o), N = E.length; N--; ) {
      var P = E[N], ee = o[P];
      E[N] = [P, ee, ni(ee)];
    }
    return E;
  }
  function zt(o, E) {
    var N = zc(o, E);
    return U0(N) ? N : void 0;
  }
  var J0 = du ? lu(du, Object) : oi, el = du ? function(o) {
    for (var E = []; o; )
      Cr(E, J0(o)), o = n0(o);
    return E;
  } : oi, At = k0;
  (hu && At(new hu(new ArrayBuffer(1))) != Te || Nr && At(new Nr()) != M || Eu && At(Eu.resolve()) != Q || mu && At(new mu()) != R || Tu && At(new Tu()) != ue) && (At = function(o) {
    var E = Kt.call(o), N = E == W ? o.constructor : void 0, P = N ? Mt(N) : void 0;
    if (P)
      switch (P) {
        case s0:
          return Te;
        case o0:
          return M;
        case c0:
          return Q;
        case l0:
          return R;
        case f0:
          return ue;
      }
    return E;
  });
  function tl(o, E, N) {
    E = ln(E, o) ? [E] : Ja(E);
    for (var P, ee = -1, fe = E.length; ++ee < fe; ) {
      var G = fn(E[ee]);
      if (!(P = o != null && N(o, G)))
        break;
      o = o[G];
    }
    if (P)
      return P;
    var fe = o ? o.length : 0;
    return !!fe && Au(fe) && ti(G, fe) && (Ct(o) || ii(o));
  }
  function ti(o, E) {
    return E = E ?? l, !!E && (typeof o == "number" || le.test(o)) && o > -1 && o % 1 == 0 && o < E;
  }
  function ln(o, E) {
    if (Ct(o))
      return !1;
    var N = typeof o;
    return N == "number" || N == "symbol" || N == "boolean" || o == null || Cu(o) ? !0 : B.test(o) || !v.test(o) || E != null && o in Object(E);
  }
  function rl(o) {
    var E = typeof o;
    return E == "string" || E == "number" || E == "symbol" || E == "boolean" ? o !== "__proto__" : o === null;
  }
  function nl(o) {
    return !!Wa && Wa in o;
  }
  function ri(o) {
    var E = o && o.constructor, N = typeof E == "function" && E.prototype || un;
    return o === N;
  }
  function ni(o) {
    return o === o && !Sr(o);
  }
  function ui(o, E) {
    return function(N) {
      return N == null ? !1 : N[o] === E && (E !== void 0 || o in Object(N));
    };
  }
  function ul(o) {
    var E = [];
    if (o != null)
      for (var N in Object(o))
        E.push(N);
    return E;
  }
  var al = gu(function(o) {
    o = ol(o);
    var E = [];
    return U.test(o) && E.push(""), o.replace(X, function(N, P, ee, G) {
      E.push(ee ? G.replace(D, "$1") : P || N);
    }), E;
  });
  function fn(o) {
    if (typeof o == "string" || Cu(o))
      return o;
    var E = o + "";
    return E == "0" && 1 / o == -c ? "-0" : E;
  }
  function Mt(o) {
    if (o != null) {
      try {
        return Qa.call(o);
      } catch {
      }
      try {
        return o + "";
      } catch {
      }
    }
    return "";
  }
  function gu(o, E) {
    if (typeof o != "function" || E && typeof E != "function")
      throw new TypeError(n);
    var N = function() {
      var P = arguments, ee = E ? E.apply(this, P) : P[0], G = N.cache;
      if (G.has(ee))
        return G.get(ee);
      var fe = o.apply(this, P);
      return N.cache = G.set(ee, fe), fe;
    };
    return N.cache = new (gu.Cache || mt)(), N;
  }
  gu.Cache = mt;
  function ai(o, E) {
    return o === E || o !== o && E !== E;
  }
  function ii(o) {
    return il(o) && ot.call(o, "callee") && (!u0.call(o, "callee") || Kt.call(o) == h);
  }
  var Ct = Array.isArray;
  function _u(o) {
    return o != null && Au(o.length) && !si(o);
  }
  function il(o) {
    return dn(o) && _u(o);
  }
  function si(o) {
    var E = Sr(o) ? Kt.call(o) : "";
    return E == g || E == O;
  }
  function Au(o) {
    return typeof o == "number" && o > -1 && o % 1 == 0 && o <= l;
  }
  function Sr(o) {
    var E = typeof o;
    return !!o && (E == "object" || E == "function");
  }
  function dn(o) {
    return !!o && typeof o == "object";
  }
  function Cu(o) {
    return typeof o == "symbol" || dn(o) && Kt.call(o) == V;
  }
  var sl = He ? Kc(He) : H0;
  function ol(o) {
    return o == null ? "" : V0(o);
  }
  function cl(o, E, N) {
    var P = o == null ? void 0 : Za(o, E);
    return P === void 0 ? N : P;
  }
  function ll(o, E) {
    return o != null && tl(o, E, w0);
  }
  function Nu(o) {
    return _u(o) ? za(o) : $0(o);
  }
  function fl(o) {
    return _u(o) ? za(o, !0) : q0(o);
  }
  function dl(o, E) {
    return o == null ? {} : W0(o, z0(o), Y0(E));
  }
  function hl(o) {
    return o;
  }
  function El(o) {
    return ln(o) ? Xt(fn(o)) : Q0(o);
  }
  function oi() {
    return [];
  }
  e.exports = dl;
})(Un, Un.exports);
var mp = Un.exports;
const Tp = /* @__PURE__ */ Er(mp);
class ds {
  constructor(t) {
    this.props = t;
    for (const [r, n] of Object.entries(t))
      Object.defineProperty(this, r, {
        get: () => n
      }), Object.defineProperty(this, Ep(r), {
        get: () => n
      });
  }
  get keys() {
    return Object.keys(this.props);
  }
}
function bp(e) {
  if (!us.isShorthand(e))
    return new ds({ [e]: this.css(e) });
  const t = this.css(e) && bb(e, this.css(e)), r = Tp(us.expand(e).reduce((n, u) => Object.assign(n, { [u]: this.css(u) }), {}));
  return new ds(Object.assign({}, t, r));
}
var nn = { _default: "deg" };
nn.deg = {
  grad: function(e) {
    return e / 0.9;
  },
  rad: function(e) {
    return e * (Math.PI / 180);
  },
  turn: function(e) {
    return e / 360;
  }
};
nn.grad = {
  deg: function(e) {
    return e * 0.9;
  }
};
nn.rad = {
  deg: function(e) {
    return e / (Math.PI / 180);
  }
};
nn.turn = {
  deg: function(e) {
    return e * 360;
  }
};
var pp = nn, it = {};
it.getElementFontSize = function(e) {
  return typeof getComputedStyle < "u" ? parseFloat(getComputedStyle(e, "").fontSize) : 16;
};
it.getCreatedElementDimensions = function(e, t, r) {
  var n = document.createElement("div"), u = n.style, i, s;
  if (u.position = "absolute", u.zIndex = -2147483648, u.left = 0, u.top = 0, u.visibility = "hidden", t)
    for (s in t)
      t.hasOwnProperty(s) && (u[s] = t[s]);
  return r && (n.innerHTML = r), e.appendChild(n), i = [
    n.offsetWidth,
    n.offsetHeight
  ], e.removeChild(n), i;
};
it.getCreatedElementWidth = function(e, t, r) {
  return it.getCreatedElementDimensions(e, t, r)[0];
};
it.getCreatedElementHeight = function(e, t, r) {
  return it.getCreatedElementDimensions(e, t, r)[1];
};
var gp = [
  "perspective",
  "translate",
  "translate3d",
  "translateX",
  "translateY",
  "translateZ",
  "transformOrigin"
], _p = [
  "height",
  "top",
  "translateY"
], Ap = ["absolute", "fixed"];
it.getRelativeElementDimension = function(e, t) {
  var r, n, u, i = _p.indexOf(t) > -1, s = gp.indexOf(t) > -1, c = Ap.indexOf(getComputedStyle(e, "").position) > -1;
  return s ? r = e : r = c ? e.offsetParent : e.parentNode, n = i ? r.offsetHeight : r.offsetWidth, !s && c && (u = getComputedStyle(r, ""), n -= i ? parseFloat(u.paddingTop) + parseFloat(u.paddingBottom) : parseFloat(u.paddingRight) + parseFloat(u.paddingLeft)), n;
};
it.DPI = function() {
  return typeof window > "u" ? 96 : it.getCreatedElementWidth(document.body, {
    width: "1in"
  });
}();
it.ifZeroThenOne = function(e) {
  return e === 0 ? 1 : e;
};
var Qc = it, ut = {}, au = -1, iu = -1;
ut.width = function() {
  return au;
};
ut.height = function() {
  return iu;
};
ut.max = function() {
  return Math.max(au, iu);
};
ut.min = function() {
  return Math.min(au, iu);
};
ut.setDimensions = function() {
  typeof document < "u" && (au = document.documentElement.clientWidth, iu = document.documentElement.clientHeight);
};
ut.onWindowResize = function() {
  ut.setDimensions();
};
typeof window < "u" && (window.addEventListener("resize", ut.onWindowResize, !1), window.addEventListener("orientationchange", ut.onWindowResize, !1), ut.setDimensions());
var Cp = ut, ae = Qc, vt = Cp, Be = { _default: "px" };
Be[""] = {
  px: function(e, t) {
    return parseFloat(getComputedStyle(t, "").fontSize) * e;
  }
};
Be["%"] = {
  px: function(e, t, r) {
    return e * ae.getRelativeElementDimension(t, r) / 100;
  }
};
Be.ch = {
  px: function(e, t) {
    return e * ae.ifZeroThenOne(ae.getCreatedElementWidth(t, null, "0"));
  }
};
Be.cm = {
  px: function(e) {
    return e / 2.54 * ae.ifZeroThenOne(ae.DPI);
  }
};
Be.em = {
  px: function(e, t) {
    return e * ae.getElementFontSize(t);
  }
};
Be.ex = {
  px: function(e, t) {
    return e * ae.getCreatedElementHeight(t, null, "x");
  }
};
Be.in = {
  px: function(e) {
    return e * ae.DPI;
  }
};
Be.mm = {
  px: function(e) {
    return e / 2.54 * ae.ifZeroThenOne(ae.DPI) / 10;
  }
};
Be.pc = {
  px: function(e) {
    return e * (ae.DPI / 72 * 12);
  }
};
Be.pt = {
  px: function(e) {
    return e * ae.DPI / 72;
  }
};
Be.px = {
  "": function(e, t) {
    return e / parseFloat(getComputedStyle(t, "").fontSize);
  },
  "%": function(e, t, r) {
    return e / ae.ifZeroThenOne(ae.getRelativeElementDimension(t, r)) * 100;
  },
  ch: function(e, t) {
    return e / ae.ifZeroThenOne(ae.getCreatedElementWidth(t, null, "0"));
  },
  cm: function(e) {
    return e / ae.ifZeroThenOne(ae.DPI) * 2.54;
  },
  em: function(e, t) {
    return e / ae.ifZeroThenOne(ae.getElementFontSize(t));
  },
  ex: function(e, t) {
    return e / ae.ifZeroThenOne(ae.getCreatedElementHeight(t, null, "x"));
  },
  in: function(e) {
    return e / ae.ifZeroThenOne(ae.DPI);
  },
  mm: function(e) {
    return e * 2.54 / ae.ifZeroThenOne(ae.DPI) * 10;
  },
  pc: function(e) {
    return e / (ae.DPI / 72 * 12);
  },
  pt: function(e) {
    return e * 72 / ae.DPI;
  },
  rem: function(e) {
    return e / ae.ifZeroThenOne(ae.getElementFontSize(document.documentElement));
  },
  vh: function(e) {
    return e / ae.ifZeroThenOne(vt.height() / 100);
  },
  vmax: function(e) {
    return e / ae.ifZeroThenOne(vt.max() / 100);
  },
  vmin: function(e) {
    return e / ae.ifZeroThenOne(vt.min() / 100);
  },
  vw: function(e) {
    return e / ae.ifZeroThenOne(vt.width() / 100);
  }
};
Be.rem = {
  px: function(e) {
    return e * ae.getElementFontSize(document.documentElement);
  }
};
Be.vh = {
  px: function(e) {
    return e * (vt.height() / 100);
  }
};
Be.vmax = {
  px: function(e) {
    return e * (vt.max() / 100);
  }
};
Be.vmin = {
  px: function(e) {
    return e * (vt.min() / 100);
  }
};
Be.vw = {
  px: function(e) {
    return e * (vt.width() / 100);
  }
};
var Np = Be, Vc = Qc, su = { _default: "dpi" };
su.dpi = {
  dpcm: function(e) {
    return e / 2.54;
  },
  dppx: function(e) {
    return e / Vc.DPI;
  }
};
su.dpcm = {
  dpi: function(e) {
    return e * 2.54;
  }
};
su.dppx = {
  dpi: function(e) {
    return e * Vc.DPI;
  }
};
var Ip = su, Sp = {
  angle: pp,
  length: Np,
  resolution: Ip
}, na = { exports: {} };
(function(e, t) {
  var r = function(n) {
    return n = typeof n == "string" ? n.replace(/,/g, "") : n, !isNaN(parseFloat(n)) && isFinite(n) && Object.prototype.toString.call(n).toLowerCase() !== "[object array]";
  };
  e.exports && (t = e.exports = r), t.isNumeric = r;
})(na, na.exports);
var yp = na.exports, Lr = Sp, Op = yp, je = {};
je.conversions = Lr;
var Ne = je.properties = {};
Ne.lineHeight = Ne.opacity = Ne.scale = Ne.scale3d = Ne.scaleX = Ne.scaleY = Ne.scaleZ = {
  defaultUnit: "",
  defaultValue: 1
};
Ne.rotate = Ne.rotate3d = Ne.rotateX = Ne.rotateY = Ne.rotateZ = Ne.skew = Ne.skewX = Ne.skewY = {
  defaultUnit: "deg"
};
Ne.resolution = {
  defaultUnit: "dpi",
  defaultValue: 96
};
je.convert = function(e, t, r, n) {
  var u = je.parse(t, n);
  return e === "_default" && (e = je.getDefaultUnit(n)), e === u.unit ? u.value : je.processConversion(u.unit, e, u.value, r, n);
};
je.parse = function(e, t) {
  var r = {}, n;
  return Op(e) ? (r.value = e, r.unit = t ? je.getDefaultUnit(t) : "") : (n = e.toString().trim().match(/^(-?[\d+\.\-]+)([a-z]+|%)$/i), n !== null ? (r.value = n[1], r.unit = n[2]) : (r.unit = e, r.value = t ? je.getDefaultValue(t) : 0)), r.value = parseFloat(r.value), r;
};
je.getDefaultValue = function(e) {
  return typeof Ne[e] < "u" && typeof Ne[e].defaultValue < "u" ? Ne[e].defaultValue : 0;
};
je.getDefaultUnit = function(e) {
  return typeof Ne[e] < "u" && typeof Ne[e].defaultUnit < "u" ? Ne[e].defaultUnit : "px";
};
je.processConversion = function(e, t, r, n, u) {
  var i = je.getConversionType(e), s;
  return typeof i[e][t] == "function" ? s = i[e][t] : (s = i[i._default][t], r = i[e][i._default](r, n, u)), s(r, n, u);
};
je.getConversionType = function(e) {
  var t, r = null;
  for (t in Lr)
    if (Lr.hasOwnProperty(t) && typeof Lr[t][e] < "u") {
      r = Lr[t];
      break;
    }
  return r;
};
var vp = je, hs = vp;
function xp() {
  if (this.attr("width"))
    return this.attr("width");
  if (this.css("max-width"))
    return Es(this.css("max-width"));
  if (this.css("width"))
    return Es(this.css("width"));
}
function Es(e) {
  return hs.parse(e).unit === "%" ? e : hs.convert("px", e);
}
function Xc(e, t = {}) {
  const r = Sc(e ?? [], t, typeof e == "string" && !Rp(e));
  return r.prototype.float = cb, r.prototype.height = lb, r.prototype.margin = fb, r.prototype.mso = db, r.prototype.padding = mb, r.prototype.style = bp, r.prototype.width = xp, r;
}
function Rp(e) {
  return e && !e.match(/<(body|html).+?>?/);
}
class Lp extends Rm {
  async process(t) {
    return await this.inlineCss(t);
  }
  async postprocess(t) {
    return await this.inlineCss(t);
  }
  async inlineCss(t) {
    try {
      return Xc(xm(t.html()));
    } catch {
      throw new Error("There is invalid CSS or <link> tags in this document.");
    }
  }
}
async function kp(e, t = {}) {
  return await new ob([
    new Lp()
    // require('../plugins/PreserveBodyAttributes'),
    // require('../plugins/ExtractTarget'),
    // require('../plugins/Template'),
    // new ManipulateDom([
    //     require('../dom/FixBackgroundColor'),
    //     require('../dom/FixFloatAlignment'),
    //     require('../dom/FixFontColor'),
    //     require('../dom/FixMsoWrapper'),
    //     require('../dom/FixResponsiveImages'),
    //     require('../dom/FixTableAlignment'),
    //     require('../dom/RemoveDisplayNone'),
    //     require('../dom/RemoveScriptTags'),
    // ], options.dom),
    // require('../plugins/HtmlMinifier'),
    // require('../plugins/DecodeHrefAmpersands')
  ]).process(e);
}
export {
  kp as capsulate
};
