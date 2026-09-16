# Contributing to nxt-1 astro

Terima kasih atas minat Anda untuk berkontribusi! 🎉

## 🚀 Cara Berkontribusi

### 1. Fork Repository
```bash
# Klik tombol "Fork" di GitHub
# atau gunakan GitHub CLI
gh repo fork 1astro/nxt-1-astro
```

### 2. Clone Repository
```bash
git clone https://github.com/nexoraprod/nxt-1-astro.git
cd nxt-1-astro
```

### 3. Setup Development Environment
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Create Branch
```bash
git checkout -b feature/nama-fitur-anda
# atau
git checkout -b fix/nama-bug-fix
```

### 5. Make Changes
- Edit kode di `src/App.tsx` atau buat component baru
- Test perubahan Anda
- Pastikan build berhasil: `npm run build`

### 6. Commit Changes
```bash
git add .
git commit -m "feat: menambahkan section baru tentang X"
```

**Commit Message Convention:**
- `feat:` - Fitur baru
- `fix:` - Bug fix
- `docs:` - Dokumentasi
- `style:` - Formatting, missing semi colons, etc
- `refactor:` - Refactoring code
- `test:` - Adding tests
- `chore:` - Maintenance

### 7. Push & Create Pull Request
```bash
git push origin feature/nama-fitur-anda
```

Lalu buka Pull Request di GitHub.

---

## 📝 Guidelines

### Code Style
- Gunakan TypeScript untuk type safety
- Follow React best practices
- Gunakan functional components dengan hooks
- Tulis komentar untuk logic yang kompleks
- Gunakan nama yang deskriptif untuk variables dan functions

### Component Structure
```typescript
// Contoh structure component
export function MySection() {
  // States
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // side effects
  }, []);
  
  // Handlers
  const handleClick = () => {
    // logic
  };
  
  // Render
  return (
    <section>
      {/* JSX */}
    </section>
  );
}
```

### Styling
- Gunakan Tailwind CSS classes
- Responsive design (mobile-first)
- Konsisten dengan design system yang ada
- Gunakan warna dari palette yang sudah ada

### Adding New Sections
1. Buat component baru di `src/App.tsx`
2. Tambahkan ke navigation di `Navigation` component
3. Tambahkan ke main `App` component
4. Update README.md jika perlu

### Code Examples
- Pastikan kode Python bisa dijalankan
- Tambahkan komentar yang jelas
- Gunakan contoh yang realistis
- Test kode sebelum commit

---

## 🐛 Reporting Bugs

Gunakan issue template dan sertakan:
- Deskripsi bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (jika ada)
- Environment (OS, browser, Node version)

---

## 💡 Suggesting Features

Buka issue dengan label `enhancement` dan jelaskan:
- Problem yang ingin diselesaikan
- Proposed solution
- Alternatives yang dipertimbangkan
- Additional context

---

## 📚 Documentation

Jika Anda menambah/mengubah fitur:
- Update README.md jika perlu
- Tambahkan komentar di kode
- Update dokumentasi API jika ada
- Tulis migration guide jika breaking change

---

## 🤝 Community

- Join diskusi di GitHub Discussions
- Follow kami di Twitter untuk updates
- Share project ini ke teman-teman

---

## 🎯 Areas We Need Help

- [ ] Translations (English, Japanese, etc.)
- [ ] More code examples
- [ ] Video tutorials
- [ ] Interactive playground
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] More case studies
- [ ] Testing & QA

---

## 📞 Questions?

Jangan ragu untuk bertanya di:
- GitHub Issues
- GitHub Discussions
- Email: your.email@example.com

---

Terima kasih sudah berkontribusi! 🙏

Setiap kontribusi, sekecil apapun, sangat berarti!
