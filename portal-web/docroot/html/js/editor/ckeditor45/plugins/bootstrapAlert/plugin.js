/*
	Plugin	: Bootstrap Alert
	Author	: Michael Janea (www.michaeljanea.com)
	Version	: 1.0.1
*/

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7.m.n(\'5\',{8:[\'d\',\'G\',\'H\',\'I\',\'J\',\'K\',\'L\',\'M\',\'h\',\'o-N\',\'o\',\'O\',\'P\',\'Q\',\'R\',\'d-S\',\'d-h\',\'d-T\',\'U\',\'V\',\'W\',\'X\',\'p\',\'p-h\',\'Y\',\'Z\',\'10\',\'e\',\'11\',\'12\',\'13\',\'14\',\'15\',\'16\',\'17\',\'18\',\'19\',\'1a\',\'1b\',\'1c\',\'1d\',\'1e\',\'1f\',\'1g\',\'1h\',\'1i\',\'1j\',\'1k\',\'q-1l\',\'q\',\'1m\',\'1n\',\'r\',\'r-1o\',\'1p\',\'1q\',\'1r\',\'1s\',\'1t\',\'1u\',\'1v\',\'1w\',\'1x\',\'1y\',\'1z\',\'1A\'],1B:\'1C,1D\',1E:\'5\',1F:j(6){f s=\'<3 g="2 2-t" 9="2">\'+6.8.5.t+\'</3>\'+\'<3 g="2 2-u" 9="2">\'+6.8.5.u+\'</3>\'+\'<3 g="2 2-v" 9="2">\'+6.8.5.v+\'</3>\'+\'<3 g="2 2-w" 9="2">\'+6.8.5.w+\'</3>\';6.x.n(\'y\',7.1G,{z:6.8.5.1H,1I:\'y\',1J:{1K:1},A:{k:7.m.1L(\'5\')+\'k/1M.1N.k\',1O:{9:\'1P\',\'1Q-z\':\'1R 1S\'}},1T:j(A,a){a.1U=1V;a.b.1W(\'1X\');a.b.1Y(s);1Z(f i=0;i<4;i++){a.b.$.20(\'2\')[i].21(\'22\',j(){f c=B 7.C.b(\'3\');c.$.D=l.D;c.$.E(\'9\',\'2\');c.$.F=l.F;6.23(c)})}f e=B 7.C.b("3");e.$.E(\'24\',\'25:26; 27:28\');a.b.29(e);7.x.2a(\'2b\',l)}})}});',62,136,'||alert|div||bootstrapAlert|editor|CKEDITOR|lang|role|block|element|newAlert|en|el|var|class|ca||function|css|this|plugins|add|zh|fr|pt|sr|bootstrapAlerts|success|info|warning|danger|ui|BootstrapAlert|label|panel|new|dom|className|setAttribute|innerHTML|af|sq|ar|eu|bn|bs|bg|cn|hr|cs|da|nl|au|gb|eo|et|fo|fi|gl|ka|de|gu|he|hi|hu|is|id|it|ja|km|ko|ku|lv|lt|mk|ms|mn|no|nb|fa|pl|br|ro|ru|latn|si|sk|sl|es|sv|tt|th|tr|ug|uk|vi|cy|requires|panelbutton|floatpanel|icons|init|UI_PANELBUTTON|plugin|command|modes|wysiwyg|getPath|bootstrap|min|attributes|listbox|aria|Bootstrap|Alert|onBlock|autoSize|true|addClass|bootstrapAlertClass|setHtml|for|getElementsByClassName|addEventListener|click|insertElement|style|width|430px|padding|1px|append|fire|ready'.split('|'),0,{}));

for(var i in CKEDITOR.instances){
	CKEDITOR.instances[i].ui.addButton('BootstrapAlert', {
        command : 'bootstrapAlert',
        icon 	: this.path + 'icons/bootstrapAlert.png',
    });
}