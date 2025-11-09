# Henry Hollink

Blog voor mijn son, Henry, gebouwd met `React`. De blog maakt gebruik van markdown bestanden om de
verschillende blogs op te slaan en in te laden. Met behulp van [gray-matter](https://www.npmjs.com/package/gray-matter)
wordt metadata uit de blog gehaald. Daarna wordt met [marked](https://www.npmjs.com/package/marked)
de content omgezet naar HTML en wordt een eventuele TOC opgebouwd.

## Blogs/posts

Blogs, brieven en andere posts worden in [/public/posts](./public/posts) map geplaatst in het markdown format.
Hierbij wordt gebruik gemaakt van font-matter voor extra metadata over de posts.

### Metadata

Elk bestand bevat de volgende metadata velden. **Dikgedrukte velden zijn verplicht!**

| Veldnaam        | Beschrijving                                                              |
|-----------------|---------------------------------------------------------------------------|
| **schrijver**   | De naam van de auteur van de post.                                        |
| **datum**       | De datum in 'jaar-maand-dag' notatie                                      |
| **categorie**   | De categorie waarin de post valt.                                         |
| **onderwerpen** | Onderwerpen in de post die gebruikt worden voor de 'lees ook' aanbeveling |
| **cover**       | Het pad naar de afbeelding die gebruikt wordt als cover                   |
| **titel**       | De Titel van het bericht                                                  |
| **bijschrift**  | Introductie tekst voor op de overzicht pagina om lezers te prikkelen.     |
| _serie_         | (optionele) naam van een reeks opvolgende posts                           |
| _serieIndex_    | (optionele) nummer in de gespecificeerde reeks.                           |

### Post inhoud

De inhoud van de (blog)posts wordt geschreven in markdown. Met behulp van verschillende markers
kunnen specifieke secties als **koptekst**, **afbeeldingen** en **dik/schuingedrukte teksten**
benoemd worden. Hieronder is een tabel met de verschillende mogelijkheden.

| Type           | Markdown Syntax                         | Example Render                                 |
|----------------|-----------------------------------------|------------------------------------------------|
| **Header 2–6** | `##`, `###`, etc.                       | `## Een tussenkop` → `<h2>Een tussenkop</h2>`  |
| **Paragraph**  | Just plain text                         | A normal paragraph.                            |
| **Bold**       | `**bold text**`                         | **Dikgedrukte tekst**                          |
| **Italic**     | `*italic text*`                         | *schuingedrukte tekst*                         |
| **Image**      | `![alt text](path/to/image.jpg)`        | `<img src="path/to/image.jpg" alt="alt text">` |
| **Link**       | `[text](https://example.com)`           | [example](https://example.com)                 |
| **Quote**      | `> quoted text`                         | <blockquote>quoted text</blockquote>           |
| **List**       | `- item` or `1. item`                   | Een lijst met, of zonder, nummers              |
