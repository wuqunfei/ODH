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
        let results = await Promise.all([this.queryWord(word)]);
        return [].concat(...results).filter(x => x);
    }

    async queryWord(word) {
        function T(node) {
            if (!node)
                return '';
            else
                return node.innerText.trim();
        }

        let base = 'http://www.godic.net/dicts/de/';
        let url = base + encodeURIComponent(word);
        let notes = [];
        let doc = "";
        let parser = new DOMParser();
        try {
            let response = api.fetch(url)
            doc = parser.parseFromString(response, 'text/html');
        } catch (error) {
            console.log("Request Error: %s", error)
            return notes;
        }

        let headSection = doc.querySelector('#dict-body>#exp-head');
        if (!headSection) return null;
        let expression = T(headSection.querySelector('.word'));
        if (!expression) return null;
        let reading = T(headSection.querySelector('.Phonitic'));
        let css = this.renderCSS();

        notes.push({
            css,
            expression,
            reading
        });
        return notes;
    }

    renderCSS() {
        let css = `
            <style>
            span.eg,
            span.exp,
            span.cara
            {display:block;}
            .cara {color: #1C6FB8;font-weight: bold;}
            .eg {color: #238E68;}
            #phrase I {color: #009933;font-weight: bold;}
            span.cet  {margin: 0 3px;padding: 0 3px;font-weight: normal;font-size: 0.8em;color: white;background-color: #5cb85c;border-radius: 3px;}
            </style>`;

        return css;
    }


}