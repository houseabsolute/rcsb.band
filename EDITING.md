# How to edit the website

Everything you'd want to change lives in the [`content`](content/) folder. You can edit it right on
GitHub in your browser. You don't need to install anything.

When you save a change, Render rebuilds the site. It goes live in a minute or two.

## The files

| To change...                          | Edit this file                                 |
| ------------------------------------- | ---------------------------------------------- |
| Shows                                 | [`content/shows.yaml`](content/shows.yaml)     |
| Albums, singles, and music links      | [`content/music.yaml`](content/music.yaml)     |
| The bio in the "About" section        | [`content/about.md`](content/about.md)         |
| Who's in the band                     | [`content/members.yaml`](content/members.yaml) |
| Band name, tagline, email, and links  | [`content/band.yaml`](content/band.yaml)       |
| Photos and album covers               | [`content/photos/`](content/photos/)           |

Each file has notes at the top that explain what goes where. Lines that start with `#` are notes,
and they don't show up on the site.

## Editing a file on GitHub

1. Go to the file on GitHub (the links in the table above work).
2. Click the pencil icon near the top right of the file.
3. Make your change.
4. Click **Commit changes...**, write a few words about what you changed, and click **Commit
   changes** again.

That's it. Check the site in a couple of minutes.

## Adding a show

Open `content/shows.yaml`, copy an existing show, paste it at the top or bottom, and change the
details:

```yaml
- date: 2027-02-14
  venue: The Club
  city: Minneapolis, MN
  time: 8pm
  tickets: https://example.com/tickets
```

The date has to be year-month-day, like `2027-02-14`. Shows sort themselves by date, and old
shows move to "Past shows" on their own, so you never need to delete or reorder them.

## Adding a photo

1. Go to the [`content/photos`](content/photos/) folder on GitHub.
2. Click **Add file**, then **Upload files**, and drop in your image.
3. Commit it.
4. Put the file name (like `band.jpg`) in the right spot, such as `photo:` in `band.yaml` or
   `cover:` in `music.yaml`.

The name has to match exactly, including capital letters, so `Band.JPG` and `band.jpg` are
different. It's easiest to stick to lowercase names with no spaces, like `spring-tour.jpg`. If the
name doesn't match a photo in the folder, the site won't update until you fix it.

Try to keep photos under 1 MB or so. Big photos make the site slow on phones.

## Adding a music player

Bandcamp, Spotify, and YouTube all have a "Share" or "Embed" button that gives you a chunk of code.
Paste it into `content/music.yaml` under the release, like this:

```yaml
- title: Our Album
  year: 2026
  embed: |
    <iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/..."></iframe>
```

`embed: |` lines up with `title:` and `year:`. Every line of the pasted code must start further to
the right than the word `embed`.

## Things that trip people up in `.yaml` files

- **Spaces matter.** Keep things lined up the way the examples are. Use spaces, not tabs.
- **Colons in text.** If your text has a `:` in it, wrap the whole thing in double quotes, like
  `notes: "Note: 21+ only"`.
- **Each new item starts with `- `**, a dash and a space.

## If something goes wrong

If a file has a mistake, the rebuild fails and **the old version of the site stays up**. Nothing
breaks for visitors, but your change won't show up either.

If your change doesn't appear after a few minutes, look over what you changed for the problems
listed above. You can always undo your change on GitHub and try again. Whoever set up the site on
[Render](https://dashboard.render.com/) can also look at the deploy log, which names the file and
says what to fix.
