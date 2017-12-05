(function() {
	
	var collapseUtil = {
		getId: function(){
			return Math.random().toString(36).substring(8);
		},
		
		createCollapseElement : function(editor, titleVal, contentVal, align, defState){
			var element = editor.document.createElement('div');
			var namespace = collapseUtil.getId();
			var blockId = 'ecollapseBlock_' + namespace;
			
			element.setAttribute('data-namespace', namespace);
			element.setAttribute('class', 'ecollapse');
			element.setAttribute('data-defstate', defState);
			
            var link = editor.document.createElement('a');
			link.setAttribute('href', 'javascript:void(0);');
			link.setAttribute('onclick', 'var block = document.getElementById(\'' + blockId + '\'); var parent = block.parentNode.parentNode; if (!parent.classList.contains(\'cke_widget_wrapper\')) { block.classList.contains(\'hide\') ? block.classList.remove(\'hide\') : block.classList.add(\'hide\');}');
			link.setAttribute('class', 'ecollapse-title');
			link.setStyle('display', 'block');
            link.setHtml(Liferay.Util.escapeHTML(titleVal));
            
            if (align == null){
				element.setAttribute('data-align', '');
			} else {
				element.setAttribute('data-align', align);
				link.setStyle('text-align', align);
			}
            
            element.append(link);

            var hiddenDiv = editor.document.createElement('div');
            if (defState == 'true' || defState == ''){
            	hiddenDiv.setAttribute('class', 'ecollapse-content hide');
            } else {
            	hiddenDiv.setAttribute('class', 'ecollapse-content');
            }
			hiddenDiv.setAttribute('id', blockId);
			hiddenDiv.setHtml(contentVal);
			element.append(hiddenDiv);

			return element;
		},

		createContentElement: function (editor, element, contentVal, defState){
			var hiddenDiv = element.getElementsByTag('div').getItem(0);
			if (!hiddenDiv){
				hiddenDiv = editor.document.createElement('div');
				var namespace = element.getAttribute('data-namespace');
				var blockId = 'ecollapseBlock_' + namespace;
				if (defState == 'true'){
					hiddenDiv.setAttribute('class', 'ecollapse-content hide');
				} else {
					hiddenDiv.setAttribute('class', 'ecollapse-content');
				}
				hiddenDiv.setAttribute('id', blockId);
			}
			hiddenDiv.setHtml(contentVal);

			return hiddenDiv;
		},

		createTitleElement: function(editor, element, titleVal, align){
			var link = element.getElementsByTag('a').getItem(0);
			if (!link){
				link = editor.document.createElement('a');
				var namespace = element.getAttribute('data-namespace');
				var blockId = 'ecollapseBlock_' + namespace;
				link.setAttribute('href', 'javascript:void(0);');
				link.setAttribute('onclick', 'var block = document.getElementById(\'' + blockId + '\'); block.classList.contains(\'hide\') ? block.classList.remove(\'hide\') : block.classList.add(\'hide\');');
				link.setAttribute('class', 'ecollapse-title');
				link.setStyle('display', 'block');
				if (align != null){
					link.setStyle('text-align', align);
				}
			}
            link.setHtml(Liferay.Util.escapeHTML(titleVal));

            return link;
		},
		
		getTextareaIdForCKE: function(element){
			var elemId = element.domId;
			var elemIdSplited = elemId.split('_');
			var elemIdNumber = parseInt(elemIdSplited[1]) - 2;
			return elemIdSplited[0] + '_' + elemIdNumber + '_textarea';
		},
		
		initializeCKE: function(element){
			collapseUtil.destroyInstanceCKE(element);
			var elemId = collapseUtil.getTextareaIdForCKE(element);
			var editor = CKEDITOR.replace(
					elemId,
					{
						customConfig: '/html/js/editor/ckeditor45/plugins/ecollapse/dialogs/ckeditor/config.js',
						filebrowserBrowseUrl: window.localStorage.getItem('LCKE_filebrowserBrowseUrl'),
						filebrowserUploadUrl: null,
						toolbar: window.localStorage.getItem('LCKE_toolbar'),
						on: {
					        instanceReady: function(ev) {
								var writer = ev.editor.dataProcessor.writer;
								writer.indentationChars = '  ';
								var dtd = CKEDITOR.dtd;
		       					for (var e in CKEDITOR.tools.extend({}, dtd.$block, dtd.$listItem, dtd.$tableContent)) {
		            				ev.editor.dataProcessor.writer.setRules(e, {
						                indent: false,
						                breakBeforeOpen: false,
						                breakAfterOpen: false,
						                breakBeforeClose: false,
						                breakAfterClose: false
		           					});

		       					 }
		       					 
						        for (var e in CKEDITOR.tools.extend({}, dtd.$list, dtd.$listItem, dtd.$tableContent)) {
						            ev.editor.dataProcessor.writer.setRules(e, {
						                indent: true,
						            });
						
						        }
					        }
					    }
					});
			return editor;
		},
		
		getInstanceCKE: function(element){
			var elemId = collapseUtil.getTextareaIdForCKE(element);
			if (CKEDITOR.instances[elemId]) {
				return CKEDITOR.instances[elemId]
	        }
			return null;
		},
		
		destroyInstanceCKE: function(element){
			var elemId = collapseUtil.getTextareaIdForCKE(element);
        	if (CKEDITOR.instances[elemId]) {
        		try{
        			CKEDITOR.instances[elemId].destroy();
        		} catch(e){}
	        }
		}
		
	}

	CKEDITOR.dialog.add('ecollapseDialog',function(editor) {
		return {
			title : 'Коллапс',
			minWidth : 640,
			minHeight : 480,
			width: 1024,
			height: 768,
			contents : [
			    {
					id : 'tab-basic',
					label : '',
					elements : [
							{
							    id: 'align',
							    type: 'select',
							    label: 'Выравнивание заголовка',
							    items: [
							        [ editor.lang.common.notSet, '' ],
							        [ editor.lang.common.alignLeft, 'left' ],
							        [ editor.lang.common.alignRight, 'right' ],
							        [ editor.lang.common.alignCenter, 'center' ]
							    ],
							    setup: function(widget) {
									this.setValue(widget.data.align);
		                        },
		                        commit: function (widget) {
		                        	widget.setData('align', this.getValue());
 		                        }
							},   
							{
								type : 'text',
								id : 'text_title',
								label : 'Заголовок',
								validate: CKEDITOR.dialog.validate.notEmpty("Заголовок не должен быть пустым."),
								
								setup: function(widget) {
									this.setValue(widget.data.linkData);
		                        },
		                        commit: function (widget) {
		                        	widget.setData('linkData', this.getValue());
 		                        }
							},
							{
	 							type: 'textarea',
	 							id: 'ecollapse_content',
	 							label: 'Контент',
	 							rows: 20,
	 							onShow: function(){
	 								var element = this;
									var editor = collapseUtil.initializeCKE(element);
	 							},
	 							setup: function(widget) {
									this.setValue(widget.data.contentData);
		                        },
		                        commit: function (widget) {
		                        	widget.setData('contentData', this.getValue());
		                        }
							},
							{
							    id: 'default_state',
							    type: 'select',
							    label: 'Состояние по умолчанию',
							    items: [
							        [ 'Свернут', 'true' ],
							        [ 'Развернут', 'false' ]
							    ],
							    setup: function(widget) {
									this.setValue(widget.data.defState);
		                        },
		                        commit: function (widget) {
		                        	widget.setData('defState', this.getValue());
 		                        }
							}
					]
				}
			],
			
			onShow: function() {
	            var selection = editor.getSelection();
	            var element = selection.getSelectedElement();
	            this.insertMode = true;
	            if (element != null){
	            	this.insertMode = false;
	            }
	        },
	        
			onOk: function() {
            	var dialog = this;
            	var contentElement = dialog.getContentElement('tab-basic', 'ecollapse_content');
            	collapseUtil.destroyInstanceCKE(contentElement);
            	if (this.insertMode){
            		var titleVal = dialog.getValueOf('tab-basic', 'text_title');
                	var contentVal = dialog.getValueOf('tab-basic', 'ecollapse_content');
                	var align = dialog.getValueOf('tab-basic', 'align');
                	var defState = dialog.getValueOf('tab-basic', 'default_state');
                	var element = collapseUtil.createCollapseElement(editor, titleVal, contentVal, align, defState);
                    editor.insertElement(element);
                    editor.widgets.initOn(element, 'ecollapseWidget', {});
            	}
            	
	        }
		};
	});
})();