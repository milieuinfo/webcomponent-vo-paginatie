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
            'huidige-pagina': Number,
            'totaal-aantal-paginas': Number
        }
    }

    render() {
        return html`
            <button id="vorige" @click="${this._vorige}">&lt;</button> 
            <span>${this['huidige-pagina']}/${this['totaal-aantal-paginas']}<span>  
            <button id="volgende" @click="${this._volgende}">&gt;</button>
        `;
    }

    _vorige () {
        this['huidige-pagina']--;
    }

    _volgende() {
        this['huidige-pagina']++;
    }
}

customElements.define('vo-paginatie', VoPaginatie);