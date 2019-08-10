class Decn_Eudict {
    constructor(options) {
        this.options = options;
        this.maxexample = 2;
        this.word = '';
        this.popup = null;
    }

    async displayName() {
        let locale = await api.locale();
        if (locale.indexOf('CN') != -1) return '欧路德语助手';
        if (locale.indexOf('TW') != -1) return '欧路德语助手';
        return 'Eudict DE->CN Dictionary';
    }

    setOptions(options) {
        this.options = options;
        this.maxexample = options.maxexample;
    }

    async findTerm(word) {
        this.word = word;
        if (!word) {
            return null;
        }
        let base = 'http://www.godic.net/dicts/de/';
        let url = base + encodeURIComponent(word);

        let terms = JSON.parse(await api.fetch(url));
        if (terms.length == 0) {
            return null;
        }
    }
}