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
            huidigePagina: {
                type: Number,
                attribute: 'huidige-pagina'
            },
            totaalAantalpaginas: {
                type: Number,
                attribute: 'totaal-aantal-paginas'
            }
        }
    }

    render() {
        return html`
            button id="vorige" @click="${this._vorige}">&lt;</button> 
            <span>${this.huidigePagina}/${this.totaalAantalpaginas}<span>  
            <button id="volgende" @click="${this._volgende}">&gt;</button>
        `;
    }

    _vorige () {
        this.huidigePagina--;
    }

    _volgende() {
        this.huidigePagina++;
    }

    _isEerstePagina() {
        return this.huidigePagina == 0;
    }

    _isLaatstePagina() {
        return this.huidigePagina == this.totaalAantalPaginas;
    }
}

customElements.define('vo-paginatie', VoPaginatie);