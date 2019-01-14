import {LitElement, html} from '../../node_modules/vodomg-litelement/@polymer/lit-element/lit-element.js';

class VoPaginatie extends LitElement {
    static get EVENTS() {
		return {
            VORIGE_PAGINA: 'vo-pagination-vorige',
            VOLGENDE_PAGINA: 'vo-pagination-volgende'
		}
    }
    
    static get properties() {
        return {
            'huidige-pagina': {
                type: Number,
                value: 0
            },
            'totaal-aantal-paginas': Number
        }
    }

    render() {
        return html`
            <button id="vorige" @click="${this._eerstePagina}" ?disabled="${this._isEerstePagina()}">&lt;&lt;</button>
            <button id="vorige" @click="${this._vorige}" ?disabled="${this._isEerstePagina()}">&lt;</button>
            <span>${this['huidige-pagina']}/${this['totaal-aantal-paginas']}<span>
            <button id="volgende" @click="${this._volgende}" ?disabled="${this._isLaatstePagina()}">&gt;</button>
            <button id="volgende" @click="${this._laatstePagina}" ?disabled="${this._isLaatstePagina()}">&gt;&gt;</button>
        `;
    }

    _vorige () {
        this['huidige-pagina']--;
    }

    _volgende() {
        this['huidige-pagina']++;
    }

    _eerstePagina() {
        this._setHuidigePagina(0);
    }

    _laatstePagina() {
        this._setHuidigePagina(this['totaal-aantal-paginas']);
    }

    _isEerstePagina() {
        return this['huidige-pagina'] == 0;
    }

    _isLaatstePagina() {
        return this['huidige-pagina'] == this['totaal-aantal-paginas'];
    }

    _setHuidigePagina(value) {
        this['huidige-pagina'] = value;
    }
}

customElements.define('vo-paginatie', VoPaginatie);