(function () {
  "use strict";

  var T = {
    fr: {
      skip: "Aller au contenu",
      nav_about: "Parcours", nav_skills: "Compétences", nav_activities: "Activités", tab_all: "Tous", nav_projects: "Projets", nav_cv: "CV", nav_contact: "Contact",
      role: "Alternant développeur full stack",
      stat_projects: "projets", stat_langs: "langues", stat_rhythm: "semaines entreprise / école", stat_degree: "diplôme prévu",
      copy_mail: "Copier l'adresse", copied: "Adresse copiée",
      doc_title: "Jean-Emmanuel Jacquier — Portfolio",
      doc_desc: "Portfolio de Jean-Emmanuel Jacquier, alternant développeur full stack et étudiant en informatique à Epitech Lyon.",
      hero_eyebrow: "Bonjour, je suis",
      hero_lead: "Alternant développeur full stack chez Dymension et étudiant en informatique à Epitech Lyon. Passionné par le développement, l'auto-hébergement et les systèmes.",
      hero_cta1: "Voir mes projets", hero_cta2: "Me contacter",
      about_title: "Parcours",
      about_intro: "Après des classes préparatoires, je me suis orienté vers l'informatique (BTS, BUT puis Epitech). J'aime construire des applications de bout en bout et héberger mes propres services.",
      tl0_title: "Alternant développeur full stack", tl0_text: "Dymension conçoit des applications tactiles pour tables interactives et tablettes professionnelles. Depuis mon arrivée : documentation, outils DevOps et correction de bugs existants. Prochaine étape : l'application interne reliée aux bornes de l'entreprise, en architecture microservices.",
      tl1_title: "Bachelor Informatique & Tech, 3e année", tl1_text: "Epitech Lyon. Diplôme prévu en 2027, en alternance.",
      tl2_title: "Stage — Technicien bureautique", tl2_text: "Communauté du Chemin Neuf (Lyon). Configuration et inventaire d'équipements destinés aux membres, et développement d'une solution automatisée de configuration de postes Windows.",
      tl3_title: "BUT Informatique (Réalisation d'applications), 2e année", tl3_text: "Université des Antilles. DUT Informatique obtenu en juillet 2026 (diplôme intermédiaire).",
      tl4_title: "BTS CIEL, 1re année", tl4_text: "CNED. Cybersécurité, informatique et réseaux, électronique : ma réorientation vers l'informatique.",
      tl5_title: "Classes préparatoires (PCSI puis PSI)", tl5_text: "Les Chartreux, en partenariat avec CPE Lyon.",
      skills_title: "Compétences",
      sk_lang: "Langages", sk_fw: "Frameworks", sk_db: "Bases de données", sk_tools: "Outils", sk_ai: "IA / LLM", sk_spoken: "Langues",
      l_fr: "Français : langue maternelle", l_en: "Anglais : C1 (certifié Cambridge)", l_de: "Allemand : B2 (baccalauréat, section européenne)",
      interests: "Centres d'intérêt : homelab et auto-hébergement, mangas et webtoons, et la coinche (une variante de la belote, l'un de mes loisirs préférés : je cherche à rejoindre une association à Lyon).",
      act_title: "Activités",
      act1_title: "La coinche", act1_text: "Une variante de la belote et l'un de mes loisirs préférés. Je cherche à rejoindre une association de coinche à Lyon pour jouer régulièrement.",
      act2_title: "Homelab et auto-hébergement", act2_text: "J'aime tester des outils et héberger moi-même mes services plutôt que de dépendre de plateformes tierces. Ce portfolio tourne d'ailleurs sur mon propre serveur.",
      act3_title: "Mangas, manhwas et webtoons", act3_text: "Je lis surtout des mangas, des manhwas et des webtoons : une bonne façon de décrocher des écrans de code.",
      projects_title: "Projets", proj_personal: "Projets personnels", proj_academic: "Projets universitaires",
      p1_text: "Bot Discord en français pour lire la Bible (Louis Segond 1910) : recherche de versets, verset du jour envoyé automatiquement, lectures de la messe et calendrier liturgique.",
      p2_text: "Bot Discord en français pour lire le Coran (texte arabe et traduction française) et des hadiths, avec l'envoi automatique d'une aya et d'un hadith du jour.",
      p3_title: "Serveur personnel (VPS)",
      p3_text: "VPS Debian partagé qui héberge mes bots et mes services : migration de tout vers Docker (Vaultwarden, TeamSpeak, MariaDB…), reverse proxy Traefik avec HTTPS automatique, conteneur Incus isolé pour un second utilisateur, pare-feu et SSH durcis, supervision Prometheus / Grafana avec alertes, sauvegardes chiffrées hors site testées en restauration.",
      a1_title: "Plateforme de covoiturage", a1_text: "Site de covoiturage pour les membres de l'université, avec une version mobile en bêta.",
      a2_title: "Analyse de données", a2_text: "Nettoyage, analyse et visualisation de jeux de données en R.",
      a3_title: "Archivage numérique de documents", a3_text: "Recherche, filtrage et gestion des droits d'accès pour un système d'archivage de documents.",
      code_link: "Code source sur GitHub",
      cv_title: "CV", cv_text: "Aperçu de mon CV. Cliquez dessus pour l'ouvrir dans un nouvel onglet, ou téléchargez-le en PDF.",
      cv_fr_label: "CV en français", cv_en_label: "CV en anglais", cv_open: "Ouvrir dans un nouvel onglet", cv_dl: "Télécharger", cv_fr_aria: "Ouvrir le CV en français dans un nouvel onglet (PDF)", cv_en_aria: "Ouvrir le CV en anglais dans un nouvel onglet (PDF)",
      contact_title: "Contact",
      contact_text: "Un projet, une question, une proposition ? Écrivez-moi. Je suis basé à Villeurbanne, près de Lyon.",
      footer: "Site auto-hébergé"
    },
    en: {
      skip: "Skip to content",
      nav_about: "Background", nav_skills: "Skills", nav_activities: "Activities", tab_all: "All", nav_projects: "Projects", nav_cv: "Resume", nav_contact: "Contact",
      role: "Full-stack developer apprentice",
      stat_projects: "projects", stat_langs: "languages", stat_rhythm: "weeks company / school", stat_degree: "expected graduation",
      copy_mail: "Copy address", copied: "Address copied",
      doc_title: "Jean-Emmanuel Jacquier — Portfolio",
      doc_desc: "Portfolio of Jean-Emmanuel Jacquier, full-stack developer apprentice and computer science student at Epitech Lyon.",
      hero_eyebrow: "Hi, I'm",
      hero_lead: "Full-stack developer apprentice at Dymension and computer science student at Epitech Lyon. Passionate about development, self-hosting and systems.",
      hero_cta1: "See my projects", hero_cta2: "Get in touch",
      about_title: "Background",
      about_intro: "After preparatory classes, I turned to computer science (BTS, then BUT, then Epitech). I like building applications end to end and hosting my own services.",
      tl0_title: "Full-stack developer apprentice", tl0_text: "Dymension builds touch applications for interactive tables and professional tablets. So far: documentation, DevOps tooling and fixing existing bugs. Next step: the internal application connected to the company's kiosks, built as microservices.",
      tl1_title: "Computer Science & Technology Bachelor's, 3rd year", tl1_text: "Epitech Lyon. Expected graduation in 2027, as an apprentice.",
      tl2_title: "Internship — IT technician", tl2_text: "Communauté du Chemin Neuf (Lyon). Configuration and inventory of equipment for members, and development of an automated solution for configuring Windows workstations.",
      tl3_title: "BUT in Computer Science (Application Development), 2nd year", tl3_text: "Université des Antilles. DUT in Computer Science awarded in July 2026 (intermediate diploma).",
      tl4_title: "BTS CIEL, 1st year", tl4_text: "CNED. Cybersecurity, IT and networks, electronics: my move into computer science.",
      tl5_title: "Preparatory classes for engineering schools (PCSI then PSI)", tl5_text: "Les Chartreux, in partnership with CPE Lyon.",
      skills_title: "Skills",
      sk_lang: "Programming languages", sk_fw: "Frameworks", sk_db: "Databases", sk_tools: "Tools", sk_ai: "AI / LLM", sk_spoken: "Languages",
      l_fr: "French: native speaker", l_en: "English: C1 (Cambridge certified)", l_de: "German: B2 (baccalaureate, European section)",
      interests: "Interests: homelab and self-hosting, manga and webtoons, and coinche (a variant of belote and one of my favourite hobbies: I would like to join a club in Lyon).",
      act_title: "Activities",
      act1_title: "Coinche", act1_text: "A variant of belote and one of my favourite hobbies. I would like to join a coinche club in Lyon to play regularly.",
      act2_title: "Homelab and self-hosting", act2_text: "I enjoy trying out tools and hosting my own services rather than relying on third-party platforms. This portfolio runs on my own server.",
      act3_title: "Manga, manhwa and webtoons", act3_text: "I mostly read manga, manhwa and webtoons: a good way to switch off from code.",
      projects_title: "Projects", proj_personal: "Personal projects", proj_academic: "Academic projects",
      p1_text: "French-language Discord bot to read the Bible (Louis Segond 1910): verse search, automatic daily verse, Mass readings and liturgical calendar.",
      p2_text: "French-language Discord bot to read the Quran (Arabic text and French translation) and hadiths, with an automatic verse and hadith of the day.",
      p3_title: "Personal server (VPS)",
      p3_text: "Shared Debian VPS hosting my bots and services: everything migrated to Docker (Vaultwarden, TeamSpeak, MariaDB…), Traefik reverse proxy with automatic HTTPS, isolated Incus container for a second user, hardened firewall and SSH, Prometheus / Grafana monitoring with alerts, encrypted off-site backups tested by restoring them.",
      a1_title: "Carpooling platform", a1_text: "Carpooling website for university members, with a mobile beta version.",
      a2_title: "Data analysis", a2_text: "Cleaning, analysis and visualization of datasets in R.",
      a3_title: "Digital document archiving", a3_text: "Search, filtering and access-rights management for a document archiving system.",
      code_link: "Source code on GitHub",
      cv_title: "Resume", cv_text: "A preview of my resume. Click it to open it in a new tab, or download it as a PDF.",
      cv_fr_label: "Resume in French", cv_en_label: "Resume in English", cv_open: "Open in a new tab", cv_dl: "Download", cv_fr_aria: "Open the French resume in a new tab (PDF)", cv_en_aria: "Open the English resume in a new tab (PDF)",
      contact_title: "Contact",
      contact_text: "A project, a question, a proposal? Write to me. I am based in Villeurbanne, near Lyon.",
      footer: "Self-hosted site"
    }
  };

  var root = document.documentElement;
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function setLang(lang) {
    var d = T[lang] || T.fr;
    root.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (d[k] == null) return;
      // les titres contenant « e » / « re » en exposant gardent leur balise <sup> : on n'écrase que le texte brut
      el.textContent = d[k];
    });
    var flag = document.getElementById("langflag");
    flag.src = lang === "fr" ? "images/flag-gb.svg" : "images/flag-fr.svg";
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      if (d[k]) el.setAttribute("aria-label", d[k]);
    });
    document.title = d.doc_title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", d.doc_desc);
    store("lang", lang);
  }

  function setTheme(theme) {
    if (theme === "light" || theme === "dark") { root.setAttribute("data-theme", theme); store("theme", theme); }
  }

  var lang = load("lang") || ((navigator.language || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en");
  setLang(lang);
  var savedTheme = load("theme");
  if (savedTheme) setTheme(savedTheme);

  document.getElementById("lang").addEventListener("click", function () { setLang(root.lang === "fr" ? "en" : "fr"); });
  document.getElementById("theme").addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(dark ? "light" : "dark");
  });
  document.getElementById("year").textContent = new Date().getFullYear();


  window.PF = { T: T };

})();
