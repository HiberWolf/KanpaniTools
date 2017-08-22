(function(){
    "use strict";
    
    window.KTTranslationManager = {
        contentLang: 'en',
        uiLang: 'en',
        langDict: {},

        loadLanguage: function(lang, callback) {
            var self = this;
            if (typeof self.langDict[lang] == 'undefined') {
                $.getJSON('lib/lang/' + lang + '.json', function( data ) {
                    self.langDict[lang] = data;
                    if (typeof callback == 'function') callback();

                }).fail(function( jqxhr, textStatus, error ) {
                    var err = textStatus + ", " + error;
                    console.log( "Request Failed: " + err );
                });    
            } else {
                if (typeof callback == 'function') callback();
            }
        },

        getTranslatedText: function(textKey, lang) {
            if (typeof this.langDict[lang] == 'undefined') return textKey;
            if (typeof this.langDict[lang][textKey] == 'undefined') {
                if (typeof this.langDict['en'][textKey] != 'undefined') {
                    return this.langDict['en'][textKey];
                } else {
                    return textKey;
                }
            }
            return this.langDict[lang][textKey];
        },

        getContentTranslatedText: function(textKey) {
            return this.getTranslatedText(textKey, this.contentLang);
        },

        getUITranslatedText: function(textKey) {
            return this.getTranslatedText(textKey, this.uiLang);
        }
    }

})();