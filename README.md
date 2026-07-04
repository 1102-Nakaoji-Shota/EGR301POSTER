# SEM Building Renovation Project

Simple one-page website for the QR code on the SEM Building Renovation Project academic engineering poster.

## Files

- `index.html` contains the page sections.
- `style.css` contains the mobile-first visual design.
- `script.js` loads and displays references from JSON.
- `data/references.json` contains editable reference entries.

## Updating The Final Poster

The final poster image path is set in `index.html`.

1. Create an `images` folder.
2. Add the high-resolution poster file as `final-poster.jpg`.
3. If you use a different file name, update the `src` and `data-image` values in the Final Poster section.

Example:

```html
<img class="poster-image" src="images/final-poster.jpg" alt="Final poster for the SEM Building Renovation Project">
```

## Updating References

Edit `data/references.json`. Each reference should use this format:

```json
{
  "title": "Reference title",
  "source": "Author, organization, publication, or date",
  "link": "https://example.com"
}
```

## Updating Downloads

The download buttons currently point to `#`. To add PDFs later:

1. Create a `downloads` folder.
2. Add PDF files.
3. Update the matching links in `index.html`.

Example:

```html
<a class="download-button" href="downloads/final-poster.pdf">Final Poster PDF</a>
```

## Viewing The Site

Open `index.html` in a browser. If references do not load because of browser file restrictions, run a simple local server from this folder:

```powershell
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```
