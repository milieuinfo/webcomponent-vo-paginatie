import {LitElement, html} from '../../node_modules/vodomg-litelement/@polymer/lit-element/lit-element.js';

export class VoPaginatie extends LitElement {
    static get EVENTS() {
		return {
            HAAL_PAGINA_OP: 'vo-paginatie-haal-pagina-op'
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
            <button id="eerste" @click="${this._eerstePagina}" ?disabled="${this._isEerstePagina()}">&lt;&lt;</button>
            <button id="vorige" @click="${this._vorige}" ?disabled="${this._isEerstePagina()}">&lt;</button>
            <span id="huidige_pagina">${this.huidigePagina+1}</span>/<span id="totaal_aantal_paginas">${this.totaalAantalPaginas}</span>
            <button id="volgende" @click="${this._volgende}" ?disabled="${this._isLaatstePagina()}">&gt;</button>
            <button id="laatste" @click="${this._laatstePagina}" ?disabled="${this._isLaatstePagina()}">&gt;&gt;</button>
        `;
    }


    _vorige () {
        if (this.huidigePagina > 0) {
            this.huidigePagina--;
            this._dispatchHaalPaginaOpEvent(this.huidigePagina);
        }
    }

    _volgende() {
        if (this.huidigePagina < this.totaalAantalPaginas - 1) {
            this.huidigePagina++;
            this._dispatchHaalPaginaOpEvent(this.huidigePagina);
        }
    }

    _dispatchHaalPaginaOpEvent(paginaNummer) {
        this.dispatchEvent(new CustomEvent(VoPaginatie.EVENTS.HAAL_PAGINA_OP, {detail: paginaNummer, bubbles: true, composed: true}));
    }

    
    _isEerstePagina() {
        return this.huidigePagina == 0;
    }

    _isLaatstePagina() {
        return this.huidigePagina == this.totaalAantalPaginas - 1;
    }

    _eerstePagina() {
        this._setHuidigePagina(0);
        this._dispatchHaalPaginaOpEvent(0);
    }

    _laatstePagina() {
        let laatstePaginaNummer = this.totaalAantalPaginas - 1;
        this._setHuidigePagina(laatstePaginaNummer);
        this._dispatchHaalPaginaOpEvent(laatstePaginaNummer);
    }

    _setHuidigePagina(value) {
        this.huidigePagina = value;
    }
    
}


customElements.define('vo-paginatie', VoPaginatie);