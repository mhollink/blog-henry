export type PostMeta = {
    /**
     * De naam van de map waarin de blog en bijbehorende bestanden zich bevinden.
     */
    slug: string;

    /**
     * De naam van de schrijver van de blog of post
     */
    schrijver: string;

    /**
     * Datum van de blog or post. Deze is in het dd-MM-yyyy formaat.
     */
    datum: string;

    /**
     * Categorie voor het filteren op de hoofdpagina.
     */
    categorie: string;

    /**
     * Lijst van onderwerpen in de blog die gebruikt wordt bij het
     * bepalen welke blogs/posts er worden aangeraden
     */
    onderwerpen: string[];

    /**
     * De URL van de cover afbeelding van de post.
     */
    cover: string;

    /**
     * De titel van de post welke gepresenteerd wordt in het blog overzicht
     * en op de post/blog pagina.
     */
    titel: string;

    /**
     * De extra tekst die getoond wordt op de blog overzicht pagina en in de
     * aangeraden vervolg blogs. Bevat een beknopte samenvatting die lezers
     * helpt te kiezen welke blog ze willen lezen.
     */
    bijschrift: string;

    /**
     * De naam van een blog/post serie. In het geval van een part 1 - part N
     * blog/post reeks. Deze naam wordt gebruikt om de verschillende serie
     * elementen aan elkaar te koppelen.
     */
    serie?: string;

    /**
     * Het reeksnummer in de serie. Wordt gebruikt in het 'lees verder' en
     * in de aan te raden posts. Blog/post N+1 wordt vrijwel altijd de hoogst
     * aangeraden blog/post.
     */
    serieIndex?: number;

    /**
     * Dit veld staat je toe om een blog die getoond zou worden op de pagina
     * actief te verbergen. Dit zorgt ervoor dat hij enkel via een deeplink
     * beschikbaar is. De gebruiker moet de URL dus weten.
     */
    verbergen?: boolean;
}
