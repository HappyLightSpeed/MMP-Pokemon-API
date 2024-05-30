# Projektdokumentation Pokemon API

Es freut mich, euch meine Pokémon-Website zu zeigen. Zugreifend auf die PokéAPI, stellt die Website alle Pokémon dar. Für die Schulübung, limitiere ich mich auf die ersten 151 Pokémon. Auch, weil sie für diese Darstellung und die eingebauten Features funktionieren.

### Features
- Suchfeld: Nach Pokémon suchen
- Hover: Zeigt den Back Sprite
- Click: Spielt den Ruf (cry) des Pokémon ab
- Limit Breaker Button: Ersetzt den Limit von 151 Pokémon auf den aktuellen Stand von 1025. 

*Note: Nicht alle Pokémon, die durch den Limit Breaker angezeigt werden, funktionieren mit allen Features. Einigen fehlen Back Sprites oder Rufe. Ausserdem braucht es länger zu laden.*

## Tools
Visual Studio Code <br>
[PokéAPI](https://pokeapi.co/api/v2/)<br>
[Dokumentation](https://pokeapi.co/docs/v2)<br>
FileZilla

## Learnings
Ich hab gelernt, wie cool APIs sind. Vor allem diese PokéAPI. In der Dokumentation war ich überrascht, wieviele Informationen gespeichert sind. Es ist sehr cool, dass man darauf zugreifen kann, ohne das ganze selbst bei sich zu speichern. Und dank JavaScript kann man es auch einfacher darstellen, ohne über 1000 Karten einzeln zu designen.<br>
Mit ChatGPT 4.0o war die Website auch sehr einfach zu bauen. Es hat mich fasziniert, wie schnell die Seite schon fertig war. Das Tool werde ich in Zukunft weiterhin nutzen. Es ist einfach beeindruckend, wie gut es Code versteht. Aber es ergibt ja Sinn. Roboter spricht mit Roboter.

## Pains
Ich hab vom Internet einige PokéAPI Werke kopiert, oder nachgeschrieben. um anzufangen. Dann hat's einigermassen funktioniert, aber nicht so gut. Neue Features einbauen hat dann nicht mehr geklappt. Dann hab ich JS von neu angefangen.
Ausserdem funktionierte ``fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)`` nicht mit dem ``let anzahlPokemon = 151`` nicht. <br>
Es braucht immer noch HTML/CSS. Das ganze Margin, Padding und responsivness macht mir Mühe. Die Probleme sind auch immer schwer zu finden.<br>
JavaScript ist halt so, wenn etwas falsch geschrieben wurde, funktionert das ganze JS nicht. Das ist mühsam.

## KI-Einsatz
ChatGPT 4.0o kam zu grosser Hilfe. Hier ist ein Beispielprompt:
"Du bist Programmierer mit über 10 Jahren Erfahrung. Dies ist dein HTML für eine Website, in der Pokémon angezeigt werden.<br>
Schreibe ein JavaScript File und nimm Zugriff zur https://pokeapi.co/api/v2/. Von dort, hole die Pokémon aus https://pokeapi.co/api/v2/pokemon. Anschliessend zeige sie an, Sort by ID number."

Danach schrieb ich "Füge folgendes Feature ein: ..." und es hat schnell geschrieben, erklärt und es hat funktioniert. Viel schneller als ich es allein machen könnte. Es hilft gezielt das Feature einzubauen oder das Problem zu lösen, anstatt dass ich online nach Tutorials suche.

Aber dennoch, kann es nicht alles lösen. Im CSS, einen spezifischen Margin Wert musste ich selbst bearbeiten, damit alle Karten gleich gross dargestellt werden.

## Externe Quellen
### Beitrag zum erstellen eines JavaScript Files für die erste Inspiration
[Blog: Fetching the 151 Pokemon using the PokéAPI](https://medium.com/@sergio13prez/fetching-them-all-poke-api-62ca580981a2)<br>
[GitHub](https://github.com/Nihaprezz/kanto-pokemon)

### YouTube Tutorials für diverse Versionen, ein Pokédex anzuzeigen
[Build a Pokedex - Stylized](https://www.youtube.com/watch?v=dVtnFH4m_fE)<br>
[Build a Pokedex - Cards](https://www.youtube.com/watch?v=T-VQUKeSU1w)

### Lösungen
[Solution where to find Sprites](https://stackoverflow.com/questions/69239521/unable-to-display-pokemon-image-from-pokeapi-co)