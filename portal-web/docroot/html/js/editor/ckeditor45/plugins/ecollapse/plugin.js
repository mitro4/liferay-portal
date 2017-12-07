CKEDITOR.plugins.add('ecollapse', {
	icons: 'ecollapse',
	init: function(editor){
		
		editor.addCommand('ecollapseAction', new CKEDITOR.dialogCommand('ecollapseDialog'));
		
		CKEDITOR.dialog.add('ecollapseDialog', this.path + 'dialogs/ecollapseDialog.js');
		
		editor.ui.addButton('ECollapse', {
			label: 'Коллапс',
			command: 'ecollapseAction',
			toolbar: 'liferayArticle'
		});
		
		editor.widgets.add('ecollapseWidget', {
			allowedContent:'div(!ecollapse); div(!ecollapse-content,!hide); a(!ecollapse-title)',
			dialog: 'ecollapseDialog',
			requiredContent: 'div(ecollapse)',
			
			upcast: function(element) {
				return element.name == 'div' && element.hasClass('ecollapse');
			},
			
			init: function() {
                var linkData = this.element.getElementsByTag('a').getItem(0).getHtml();
                var contentData = this.element.getElementsByTag('div').getItem(0).getHtml();
                var align = this.element.getAttribute('data-align');
                var defState = this.element.getAttribute('data-defstate');
                this.setData('linkData', linkData);
                this.setData('contentData', contentData);
                this.setData('align', align);
                this.setData('defState', defState);
                this.setData('element', this.element);
            },
            data: function() {
            	var link = this.element.getElementsByTag('a').getItem(0);
            	link.setHtml(this.data.linkData);
            	var align = this.data.align;
            	if (align == null){
            		this.element.setAttribute('data-align', '');
            		link.setStyle('text-align', 'left');
    			} else {
    				this.element.setAttribute('data-align', align);
    				link.setStyle('text-align', align);
    			}
            	var defState = this.data.defState;
            	this.element.setAttribute('data-defstate', defState);
            	var hiddenDiv = this.element.getElementsByTag('div').getItem(0);
            	if (defState == 'true' || defState == ''){
            		hiddenDiv.setAttribute('class', 'ecollapse-content hide');
            	} else {
            		hiddenDiv.setAttribute('class', 'ecollapse-content');
            	}
            	hiddenDiv.setHtml(this.data.contentData);
            	this.setData('element', this.element);
            }
		});
	}
});
