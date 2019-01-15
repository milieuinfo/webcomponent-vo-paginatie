import {LitElement, html} from "@polymer/lit-element"

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
                attribute: 'huidige-pagina',
                hasChanged(newValue, oldValue) {
                    return true;
                }
            },
            totaalAantalPaginas: {
                type: Number,
                attribute: 'totaal-aantal-paginas'
            }
        }
    }

    render() {
        return html`
            <button id="vorige" @click="${this._vorige}" ?disabled="${this._isEerstePagina()}" >&lt;</button> 
            <span>${this.huidigePagina}/${this.totaalAantalPaginas}<span>  
            <button id="volgende" @click="${this._volgende}" ?disabled="${this._isLaatstePagina()}">&gt;</button>
        `;
    }


    _vorige () {
        if (this.huidigePagina >= 0) {
            this.huidigePagina--;
        }
    }

    _volgende() {
        if (this.huidigePagina < this.totaalAantalPaginas) {
            this.huidigePagina++;
        }
    }

    _isEerstePagina() {
        return this.huidigePagina == 0;
    }

    _isLaatstePagina() {
        return this.huidigePagina == this.totaalAantalPaginas;
    }
}


customElements.define('vo-paginatie', VoPaginatie);