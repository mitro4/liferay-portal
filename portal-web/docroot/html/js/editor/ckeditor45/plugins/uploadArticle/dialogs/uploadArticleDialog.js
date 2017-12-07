(function() {

	var articleUploader = {

		upload : function(params, callback) {
			this.callback = callback;
			if (params.files != null) {
				this.uploadStart(params);
			} else {
				console.error('Params files is null!');
			}

		},

		uploadStart : function(params) {
			_this = this;

			var uploadUrl = themeDisplay.getPathMain() + "/upload-article/upload?p_auth=" + Liferay.authToken;
			var request = new XMLHttpRequest();
			request.open("POST", uploadUrl.toString(), false);
			request.onreadystatechange = function() {
				if (request.readyState == 4) {
					if (request.status == 200) {
						try {
							var response = JSON.parse(request.responseText);
							_this.callback(response.content);
						} catch (e) {
							console.error('Error parsing response', e, request);
						}
					} else {
						console.error('request error');
					}
				}
			}
			var uploadFileName = 'uploadFileName';
			var formData = new FormData();
			formData.append(uploadFileName, params.files[0]);
			request.send(formData);
			var timeout = setTimeout(function() {
				request.abort();
				console.error('request timeout');
			}.bind(this), 1000 * 60 * 3);
		}
	}

	CKEDITOR.dialog.add('uploadArticleDialog',function(editor) {
		return {
			title : 'Импорт из файла',
			minWidth : 250,
			minHeight : 70,
			contents : [
			    {
					id : 'tab-upload',
					label : '',
					elements : [
							{
								type : 'file',
								id : 'uploadArticle_filePath',
								label : 'Выберите файл'
							},
							{
								id: 'loader-anim',
								type : 'html',
								html : '<div id="uploadArticle_loader" class="hide" style="background: url(/html/themes/classic/images/progress_bar/loading_animation.gif) no-repeat top center; margin-top: 10px; padding-top: 40px; text-align: left;"></div>'
							}
					]
				}
			],
			
			onShow: function() {
				var loaderNode = document.getElementById('uploadArticle_loader');
				loaderNode.className = 'hide';
			},
			
			onOk: function() {
	            var dialog = this;
	            var nodes = document.getElementsByClassName('cke_dialog_ui_input_file');
				var iframe, i;
				for (i = 0; i < nodes.length; i++) {
					if (nodes[i].nodeName
							.toLowerCase() == 'iframe') {
						iframe = nodes[i];
					}
				}
				var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
				var fileInput = innerDoc.getElementsByName('uploadArticle_filePath')[0];

				function getExtension(filename) {
					var parts = filename.split('.');
					return parts[parts.length - 1];
				}

				function isGoodFormat(filename){
					var ext = getExtension(filename);
					switch (ext.toLowerCase()) {
						case 'doc':
						case 'docx':
						case 'odt':
						case 'xls':
						case 'xlsx':
						case 'ods':
						case 'ppt':
						case 'pptx':
						case 'odp':
						case 'vsd':
						case 'vsdx':
						case 'pdf':
							return true;
					}
					return false;
				}

				if (fileInput.value != ''){
					if(isGoodFormat(fileInput.value)) {
						var loaderNode = document.getElementById('uploadArticle_loader');
						loaderNode.className = '';
						articleUploader.upload({
								files: fileInput.files
							},
							function (text) {
								editor.document.$.body.innerHTML = text;
								// CKEDITOR.dialog.getCurrent().hide();
							});
					} else {
						alert("Данный формат фалов не поддерживатеся!");
					}
				} else {
					alert("Необходимо выбрать файл!");
				}
				
	        }
			
		};
	});
})();
