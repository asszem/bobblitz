# (Done) i2 Fix flickering word selection on cell boundaries - completed at 2026-03-14 19:22

- (done) i2-1 Increased the direction-based dead zone from 40% to 50% of slot width in `cellFromPoint`
- (done) i2-2 Root cause: at 40%, a direction switch could fire while the pointer was still inside the current cell (actual cell edge is at ~46% of slot width)
- (done) i2-3 At 50%, a cell switch only triggers once the pointer has crossed into the gap between cells, matching the expected "stay selected while inside the letter" behavior
- (done) i2-4 Diagonal flickering is still present — investigate and reduce further

# (Done) i1 New game selection menu redesign

- (done) i1-1 Replace the plain list of mode name buttons with selectable cards
- (done) i1-2 Each card shows the mode name (bold) and its full description text at all times — no hover or interaction needed to see the description
- (done) i1-3 Cards should be visually distinct and tappable on mobile (adequate touch target size, responsive width)
- (done) i1-4 Add a subtitle below the modal title ("Select a game mode." / localized) so the purpose of the modal is immediately clear
- (done) i1-5 Functionality is unchanged: clicking a card starts that game mode


# Footer
- Added a footer to the bottom of the page
- Added a feedback button with localized text: "Submit feedback, feature request or incorrect word" (EN) / "Visszajelzés, funkcióötlet vagy hibás szó beküldése" (HU)
- Modal includes:
  - Profile picture fetched from Bluesky (cdn.bsky.app avatar)
  - Descriptive text: "For any game related feedback, feature request or bug report, contact me via email" (localized in both languages)
  - Email address as a `mailto:asszem78@gmail.com` link with "Send email to" label
  - Bluesky profile link: https://bsky.app/profile/asszem.bsky.social
  - Close button
