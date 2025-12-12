# Portfolio Website

A modern, responsive portfolio website built with semantic HTML5 and CSS3. Features a clean design with smooth animations and mobile-first responsive layout.

🌐 **Live Demo**: [Add your deployed URL here]  
📸 **Screenshot**: [Add screenshot after deployment]

## Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Semantic HTML5**: Proper document structure and accessibility
- **Modern CSS**: Custom properties, Flexbox, CSS Grid, smooth transitions
- **Smooth Scrolling**: Navigation with anchor links and scroll offset
- **Accessibility**: Focus states, proper contrast ratios, semantic markup
- **Performance**: Optimized animations and efficient CSS
- **Browser Compatible**: Works on all modern browsers

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with responsive design
├── README.md           # Documentation (this file)
├── .gitignore          # Git ignore rules
└── netlify.toml        # Netlify configuration (optional)
```

## Customization Guide

### Personal Information (index.html)

Update the following sections with your information:

1. **Header & Footer**:
   - Replace "Your Name" in `<h1>` and footer
   - Update page title in `<title>` tag
   - Update meta description

2. **About Section**:
   - Replace placeholder bio paragraphs with your background
   - Add your professional summary and interests

3. **Projects Section**:
   - Update project titles in `<h3>` tags
   - Replace project descriptions
   - Update GitHub and live demo URLs
   - Add your actual project links

4. **Skills Section**:
   - Replace skill list items with your technologies
   - Add or remove skills as needed

5. **Contact Section**:
   - Update email address in mailto link
   - Replace social media URLs (GitHub, LinkedIn, Twitter)
   - Update usernames in URLs

### Styling Customization (styles.css)

Customize colors by modifying CSS custom properties in the `:root` section:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #1e293b;    /* Dark backgrounds */
    --accent-color: #3b82f6;       /* Hover states */
    --bg-light: #f8fafc;           /* Page background */
    --text-dark: #1e293b;          /* Main text color */
    /* ... other variables */
}
```

## Deployment Instructions

### Option 1: GitHub Pages (Recommended)

1. **Create GitHub Account** (if you don't have one)
   - Visit [github.com](https://github.com) and sign up

2. **Create New Repository**
   - Click "New repository"
   - Name it `username.github.io` (for user site) or any name (for project site)
   - Make it public
   - Don't initialize with README (we have our own files)

3. **Initialize Git and Push Code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repository-name.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
   - Click Save

5. **Access Your Site**
   - User site: `https://username.github.io/`
   - Project site: `https://username.github.io/repository-name/`
   - Changes take 1-2 minutes to deploy

### Option 2: Netlify

#### Method A: Drag & Drop
1. Create free account at [netlify.com](https://netlify.com)
2. Go to Sites dashboard
3. Drag your project folder onto the deploy area
4. Get instant URL and custom domain options

#### Method B: Git Integration
1. Push code to GitHub (follow steps 1-3 from GitHub Pages)
2. Connect Netlify to your GitHub account
3. Select your repository
4. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Deploy site - automatic deployments on every push

**Note**: The included `netlify.toml` file configures a redirect that sends all 404 errors to `index.html`. This is useful for single-page behavior but should be removed or updated if you later add additional static HTML pages or want a custom 404 page.

### Option 3: Netlify Drop (No Account Required)

1. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your project folder onto the page
3. Get instant temporary URL (expires after 24 hours of inactivity)
4. Perfect for quick testing and sharing

## Local Testing

### Option 1: Direct File Opening
- Simply open `index.html` in your web browser

### Option 2: Local Server (Recommended)
```bash
# Python (if installed)
python -m http.server 8000

# Node.js (if installed)
npx serve

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Access at `http://localhost:8000`

## Technologies Used

- **HTML5**: Semantic elements, proper document structure
- **CSS3**: Custom properties, Flexbox, CSS Grid, media queries
- **No JavaScript**: Pure HTML/CSS implementation
- **Mobile-First**: Responsive design approach

## Browser Support

- **Desktop**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Compatibility**: All modern browsers with CSS Grid support

## License

MIT License - Free to use and modify for personal and commercial projects.

## Contributing

This is a personal portfolio template. Feel free to:
- Fork this repository
- Customize for your own use
- Submit issues for bugs or improvements
- Share with others who need a portfolio template

## Support

If you need help with customization or deployment:
- Check the deployment instructions above
- Review the customization guide
- Open an issue on GitHub

---

**Made with ❤️ using HTML5 and CSS3**