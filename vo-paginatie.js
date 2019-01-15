import {LitElement, html} from '../../node_modules/vodomg-litelement/@polymer/lit-element/lit-element.js';

/**
 * `vo-paginatie`
 * De standaard paginatie component voor websites en applicaties van de Vlaamse overheid
 *
 * ### Events
 * 
 * De volgende events zijn beschikbaar:
 * 
 * Event | Uitleg | Detail object
 * ------|--------|---------------
 * `vo-paginatie-haal-pagina-op` | wordt afgevuurd wanneer er een nieuwe pagina moet worden opgehaald. | `paginanummer`
 *
 * @customElement
 * @polymer
 * @demo demo/vo-paginatie.html
 */
export class VoPaginatie extends LitElement {
    static get EVENTS() {
		return {
            HAAL_PAGINA_OP: 'vo-paginatie-haal-pagina-op'
		}
    }
    
    static get properties() {
        return {
            /**
             * De huidige pagina die getoond wordt. Deze begint bij nul te tellen (0 -> eerste pagina)
             */
            huidigePagina: {
                type: Number,
                attribute: 'huidige-pagina',
                hasChanged(newValue, oldValue) {
                    return true;
                }
            },
            /**
             * Het totaal aantal paginas waarover gepagineerd kan worden.
             */
            totaalAantalPaginas: {
                type: Number,
                attribute: 'totaal-aantal-paginas'
            }
        }
    }

    /**
     * Rendert het element
     * @return {TemplateResult}
     */
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

    /**
     * Dispatcht een VoPaginatie event
     * 
     * @return {void}
     */
    _dispatchHaalPaginaOpEvent(paginaNummer) {
        this.dispatchEvent(new CustomEvent(VoPaginatie.EVENTS.HAAL_PAGINA_OP, {detail: paginaNummer, bubbles: true, composed: true}));
    }

    
    /**
     * checkt of de huidige getoonde pagina de eerste pagina is.
     *  
     * @return {boolean}
     */
    _isEerstePagina() {
        return this.huidigePagina == 0;
    }

    /**
     * checkt of de huidige getoonde pagina de laatste pagina is.
     * 
     * @return {boolean}
     */
    _isLaatstePagina() {
        return this.huidigePagina == this.totaalAantalPaginas - 1;
    }

    /**
     * Zet de huidige pagina gelijk aan de eerst pagina en stuurt een event om die op te halen
     * 
     * @return {void}
     */
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