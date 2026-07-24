/* ==========================================================================
   LAWAN ISPA - CORE INTERACTIVE ENGINE (JS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // App-wide state
  const state = {
    activeTab: "edukasi",
    // Quiz state
    quiz: {
      currentQuestion: 0,
      score: 0,
      isAnswered: false,
      answers: [],
      questions: [
        {
          question: "1. Apa kepanjangan dari ISPA?",
          options: [
            "A. Infeksi Sistem Pernapasan Akut",
            "B. Infeksi Saluran Pernapasan Akut",
            "C. Infeksi Saluran Pencernaan Akut",
            "D. Infeksi Sistem Pencernaan Atas"
          ],
          correct: 1,
          explanation: "ISPA adalah singkatan dari Infeksi Saluran Pernapasan Akut."
        },
        {
          question: "2. Berapa lama umumnya penyakit ISPA berlangsung?",
          options: [
            "A. Lebih dari 1 bulan",
            "B. 21 hari",
            "C. Kurang dari 14 hari",
            "D. Lebih dari 30 hari"
          ],
          correct: 2,
          explanation: "Penyakit ISPA umumnya berlangsung secara akut yaitu kurang dari 14 hari."
        },
        {
          question: "3. Berikut yang merupakan penyebab ISPA adalah...",
          options: [
            "A. Virus dan bakteri",
            "B. Kekurangan vitamin saja",
            "C. Cedera pada dada",
            "D. Gigitan serangga"
          ],
          correct: 0,
          explanation: "ISPA paling sering disebabkan oleh infeksi virus dan bakteri."
        },
        {
          question: "4. Bagaimana cara penularan ISPA yang paling umum?",
          options: [
            "A. Gigitan nyamuk",
            "B. Makanan yang basi",
            "C. Percikan batuk atau bersin (droplet) dari penderita",
            "D. Air minum"
          ],
          correct: 2,
          explanation: "Penularan ISPA paling umum terjadi melalui percikan air liur (droplet) saat batuk atau bersin."
        },
        {
          question: "5. Manakah yang merupakan gejala ISPA?",
          options: [
            "A. Batuk dan pilek",
            "B. Demam",
            "C. Sakit tenggorokan",
            "D. Semua jawaban benar"
          ],
          correct: 3,
          explanation: "Gejala ISPA meliputi batuk, pilek, demam, dan sakit tenggorokan."
        },
        {
          question: "6. Siapa yang lebih berisiko mengalami ISPA?",
          options: [
            "A. Balita dan lansia",
            "B. Orang dengan daya tahan tubuh rendah",
            "C. Penderita penyakit kronis",
            "D. Semua jawaban benar"
          ],
          correct: 3,
          explanation: "Balita, lansia, orang dengan imun rendah, dan penderita penyakit kronis memiliki risiko lebih tinggi."
        },
        {
          question: "7. Berikut ini merupakan cara mencegah ISPA, kecuali...",
          options: [
            "A. Mencuci tangan dengan sabun",
            "B. Menggunakan masker saat sakit",
            "C. Menghindari asap rokok",
            "D. Berbagi alat makan dengan penderita ISPA"
          ],
          correct: 3,
          explanation: "Berbagi alat makan dengan penderita justru meningkatkan risiko tertular ISPA."
        },
        {
          question: "8. Apa yang sebaiknya dilakukan saat mengalami ISPA ringan?",
          options: [
            "A. Istirahat yang cukup",
            "B. Minum air putih yang banyak",
            "C. Mengonsumsi makanan bergizi",
            "D. Semua jawaban benar"
          ],
          correct: 3,
          explanation: "Penanganan ISPA ringan meliputi istirahat cukup, banyak minum air putih, dan nutrisi bergizi."
        },
        {
          question: "9. Kapan seseorang harus segera pergi ke fasilitas kesehatan?",
          options: [
            "A. Saat mengalami sesak napas",
            "B. Bibir tampak membiru",
            "C. Penurunan kesadaran",
            "D. Semua jawaban benar"
          ],
          correct: 3,
          explanation: "Sesak napas, bibir membiru, dan penurunan kesadaran adalah tanda bahaya ISPA berat yang butuh penanganan medis segera."
        },
        {
          question: "10. Mengapa penting menjaga ventilasi rumah tetap baik?",
          options: [
            "A. Agar rumah terlihat lebih luas",
            "B. Untuk menjaga sirkulasi udara dan mengurangi risiko penularan ISPA",
            "C. Agar dinding rumah tidak cepat rusak",
            "D. Agar suhu rumah lebih dingin"
          ],
          correct: 1,
          explanation: "Ventilasi yang baik menjaga sirkulasi udara lancar sehingga mengurangi konsentrasi kuman di dalam ruangan."
        }
      ]
    },
    // Symptoms state
    symptoms: {
      selected: new Set(),
      list: {
        demam: { label: "Demam (>38°C)", weight: 2 },
        batuk: { label: "Batuk Kering/Berdahak", weight: 1 },
        sesak: { label: "Sesak Napas", weight: 5 },
        pilek: { label: "Pilek / Hidung Tersumbat", weight: 1 },
        sore_throat: { label: "Sakit Tenggorokan", weight: 1 },
        lemas: { label: "Lemas / Kelelahan", weight: 1 }
      }
    },
    // Prevention state
    prevention: {
      checklist: [
        { id: "wash", label: "Cuci Tangan Teratur", desc: "Mencuci tangan 6 langkah dengan sabun minimal 20 detik.", completed: false },
        { id: "mask", label: "Gunakan Masker", desc: "Memakai masker medis/kain saat berpergian atau sedang flu.", completed: false },
        { id: "smoke", label: "Hindari Asap Rokok", desc: "Menjauh dari paparan asap rokok dan polusi udara terbuka.", completed: false },
        { id: "vent", label: "Jaga Ventilasi Rumah", desc: "Membuka jendela pagi hari agar sirkulasi udara segar lancar.", completed: false },
        { id: "eat", label: "Konsumsi Makanan Bergizi", desc: "Memperbanyak buah dan sayur kaya Vitamin C untuk imun.", completed: false }
      ],
      handwashStep: 0,
      handwashSteps: [
        { title: "Langkah 1: Gosok Telapak", desc: "Basahi tangan, tuang sabun secukupnya. Gosok kedua telapak tangan dengan memutar.", icon: "🤚" },
        { title: "Langkah 2: Punggung Tangan", desc: "Gosok punggung tangan kiri dengan telapak tangan kanan bergantian kiri-kanan secara merata.", icon: "🖐️" },
        { title: "Langkah 3: Sela-Sela Jari", desc: "Gosok sela-sela jari tangan secara menyilang hingga sisa kotoran terangkat bersih.", icon: "🤝" },
        { title: "Langkah 4: Kunci Jari", desc: "Gosok ujung jari pada telapak tangan dengan posisi jari-jemari saling mengunci bergantian.", icon: "🔒" },
        { title: "Langkah 5: Putar Ibu Jari", desc: "Genggam ibu jari kiri dengan tangan kanan lalu gosok memutar, lakukan bergantian kiri-kanan.", icon: "👍" },
        { title: "Langkah 6: Putar Kuku", desc: "Gosokkan ujung jari/kuku tangan kanan secara memutar di atas telapak tangan kiri, lakukan bergantian.", icon: "🔄" }
      ]
    },
    // Clinic state
    clinics: {
      searchQuery: "",
      activeFilter: "all",
      data: [
        { id: 1, name: "Puskesmas Kecamatan Lawan ISPA", type: "puskesmas", address: "Jl. Sehat Bugar No. 12, Jakarta", rating: 4.8, open: "Buka 24 Jam", phone: "021-555123", bpjs: true },
        { id: 2, name: "RSUD Sehat Sentosa", type: "rsud", address: "Jl. Jenderal Sudirman No. 45, Jakarta", rating: 4.9, open: "Buka 24 Jam", phone: "021-555789", bpjs: true },
        { id: 3, name: "Klinik Pratama Sehat Medika", type: "klinik", address: "Ruko Niaga Hijau Blok B/4, Jakarta", rating: 4.6, open: "08:00 - 21:00", phone: "021-555456", bpjs: true },
        { id: 4, name: "Puskesmas Kelurahan Sejahtera", type: "puskesmas", address: "Jl. Cendrawasih Indah No. 8, Jakarta", rating: 4.7, open: "07:30 - 16:00", phone: "021-555321", bpjs: true },
        { id: 5, name: "RS Paru-Paru Harapan Mulia", type: "rsud", address: "Jl. Kesehatan Paru No. 100, Jakarta", rating: 4.9, open: "Buka 24 Jam", phone: "021-555999", bpjs: false }
      ]
    }
  };

  /* ==========================================================================
     DOM SELECTORS
     ========================================================================== */
  // Navigation elements
  const navItems = document.querySelectorAll(".bottom-nav .nav-item");
  const views = document.querySelectorAll(".app-content .view-panel");
  const timeDisplay = document.querySelector(".status-left");

  // Info modal elements
  const infoBtn = document.getElementById("info-btn");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  // Cause Details Modals Data
  const causeDetails = {
    virus: {
      title: "Penyebab ISPA: Virus",
      html: `
        <p>Virus merupakan penyebab paling sering dari kasus ISPA di seluruh dunia. Infeksi virus cenderung cepat menular melalui droplet udara.</p>
        <h4>Jenis Virus Penyebab Utama:</h4>
        <ul>
          <li><strong>Rhinovirus & Influenza:</strong> Penyebab flu biasa dan flu musiman.</li>
          <li><strong>Coronavirus (SARS-CoV-2):</strong> Virus penyebab Covid-19 yang menyerang paru secara parah.</li>
          <li><strong>Respiratory Syncytial Virus (RSV):</strong> Sangat berbahaya bagi bayi dan anak kecil, dapat memicu Bronkiolitis.</li>
        </ul>
        <h4>Gejala Khas Infeksi Virus:</h4>
        <p>Biasanya diawali dengan bersin, hidung meler, sakit tenggorokan, dan demam ringan yang membaik dalam waktu 7-10 hari dengan istirahat yang cukup.</p>
      `
    },
    bakteri: {
      title: "Penyebab ISPA: Bakteri",
      html: `
        <p>Infeksi bakteri pada saluran napas biasanya lebih berat dan memerlukan penanganan medis khusus serta terapi antibiotik yang diresepkan dokter.</p>
        <h4>Jenis Bakteri Penyebab Utama:</h4>
        <ul>
          <li><strong>Streptococcus pneumoniae:</strong> Bakteri paling umum memicu infeksi paru berat (Pneumonia).</li>
          <li><strong>Haemophilus influenzae:</strong> Mampu memicu meningitis dan pneumonia pada anak-anak.</li>
          <li><strong>Bordetella pertussis:</strong> Penyebab penyakit batuk rejan (pertusis) yang berlangsung berminggu-minggu.</li>
        </ul>
        <h4>Tanda Bahaya Infeksi Bakteri:</h4>
        <p>Demam tinggi mendadak, batuk berdahak kental kekuningan/kehijauan, nyeri dada saat bernapas, dan sesak napas.</p>
      `
    },
    lingkungan: {
      title: "Penyebab ISPA: Faktor Lingkungan",
      html: `
        <p>Lingkungan yang tidak sehat menurunkan daya tahan saluran pernapasan secara kronis, mempermudah infeksi mikroorganisme masuk.</p>
        <h4>Polutan Lingkungan Teratas:</h4>
        <ul>
          <li><strong>Asap Rokok:</strong> Merusak silia (rambut getar penapis kotoran) di saluran napas.</li>
          <li><strong>Polusi Kendaraan & Pabrik:</strong> Partikel halus PM2.5 masuk hingga alveolus paru memicu iritasi konstan.</li>
          <li><strong>Debu & Jamur Rumah:</strong> Udara lembab di dalam ruangan memicu alergi dan memperburuk asma.</li>
        </ul>
        <h4>Langkah Proteksi Lingkungan:</h4>
        <p>Gunakan pembersih udara (HEPA Filter), pasang ventilasi silang, dan selalu gunakan masker di kawasan berpolusi tinggi.</p>
      `
    }
  };

  /* ==========================================================================
     CLOCK IN HEADER STATUS BAR
     ========================================================================== */
  const updateClock = () => {
    if (!timeDisplay) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    timeDisplay.textContent = `${hours}:${minutes}`;
  };
  setInterval(updateClock, 1000);
  updateClock();

  /* ==========================================================================
     TAB ROUTING / SWITCHING
     ========================================================================== */
  const switchTab = (tabId) => {
    state.activeTab = tabId;
    const targetPanel = document.getElementById(`${tabId}-view`);
    if (targetPanel) {
      targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (tabId === "pencegahan") {
      updatePreventionProgress();
    } else if (tabId === "klinik") {
      renderClinics();
    }
  };

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const tabId = item.dataset.tab;
      switchTab(tabId);
    });
  });

  /* ==========================================================================
     MODAL CONTROLLER HELPER
     ========================================================================== */
  const openModal = (title, htmlContent) => {
    modalTitle.textContent = title;
    modalBody.innerHTML = htmlContent;
    modalOverlay.classList.add("active");
  };

  const closeModal = () => {
    modalOverlay.classList.remove("active");
  };

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Info Button Handler
  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      const infoHtml = `
        <p><strong>Lawan ISPA</strong> adalah aplikasi edukatif interaktif yang didedikasikan untuk membantu masyarakat mengenali secara dini, mencegah penyebaran, serta mengambil tindakan darurat tepat sasaran terhadap Infeksi Saluran Pernapasan Akut (ISPA).</p>
        <p>Aplikasi ini khusus dirancang sebagai media edukasi kesehatan untuk masyarakat di <strong>Desa Bapangi, Kecamatan Panca Lautang, Kabupaten Sidenreng Rappang (Sidrap)</strong>.</p>
        <p>Program ini merupakan bentuk pengabdian dari mahasiswa <strong>KKN Tematik dan KKN Profesi Kesehatan Universitas Hasanuddin</strong> untuk meningkatkan kesadaran dan kesehatan masyarakat setempat.</p>
        <p style="font-size: 0.65rem; text-align: center; color: #a0aec0; margin-top: 15px;">© 2026 Kolaborasi KKN Universitas Hasanuddin</p>
      `;
      openModal("Pusat Informasi Lawan ISPA", infoHtml);
    });
  }

  // Cause Cards click actions (Modal Popup)
  document.querySelectorAll(".cause-card").forEach(card => {
    card.addEventListener("click", () => {
      const type = card.dataset.cause;
      if (causeDetails[type]) {
        openModal(causeDetails[type].title, causeDetails[type].html);
      }
    });
  });

  /* ==========================================================================
     EDUKASI: MINI QUIZE ENGINE
     ========================================================================== */
  const quizBox = document.getElementById("quiz-container");

  const renderQuiz = () => {
    if (!quizBox) return;

    const quizData = state.quiz;
    const qIndex = quizData.currentQuestion;

    // Check if completed
    if (qIndex >= quizData.questions.length) {
      // Completed View
      let percentage = Math.round((quizData.score / quizData.questions.length) * 100);
      let performanceMsg = "Luar biasa! Pemahaman Anda tentang ISPA sangat sempurna.";
      if (percentage < 60) {
        performanceMsg = "Yuk baca-baca lagi materi edukasi di atas agar lebih paham tentang ISPA.";
      } else if (percentage < 90) {
        performanceMsg = "Bagus sekali! Pemahaman Anda tentang ISPA sudah sangat baik.";
      }

      quizBox.innerHTML = `
        <div class="quiz-result-view">
          <div class="success-icon-wrapper" style="background:#d1fae5; border-color:#34d399; color:#059669; width: 50px; height: 50px; margin-bottom: 10px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width: 24px; height: 24px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"></path><polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>
          </div>
          <h3>Kuis Selesai!</h3>
          <p>${performanceMsg}</p>
          <div style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 14px;">
            Skor: <span style="color:#06d6a0;">${quizData.score}</span> / ${quizData.questions.length}
          </div>
          <button class="quiz-restart-btn" id="quiz-restart-btn">Ulangi Kuis</button>
        </div>
      `;

      document.getElementById("quiz-restart-btn").addEventListener("click", () => {
        quizData.currentQuestion = 0;
        quizData.score = 0;
        quizData.isAnswered = false;
        renderQuiz();
      });
      return;
    }

    const currentQ = quizData.questions[qIndex];
    quizBox.innerHTML = `
      <div class="quiz-header">
        <span class="quiz-badge">Kuis ISPA</span>
        <span class="quiz-score-badge">Soal ${qIndex + 1}/${quizData.questions.length}</span>
      </div>
      <div class="quiz-question">${currentQ.question}</div>
      <div class="quiz-options" id="quiz-options-box">
        ${currentQ.options.map((opt, i) => `
          <button class="quiz-opt-btn" data-index="${i}">${opt}</button>
        `).join("")}
      </div>
      <div class="quiz-footer">
        <button class="quiz-next-btn" id="quiz-next-btn">Soal Selanjutnya ➜</button>
      </div>
    `;

    // Add click listeners to option buttons
    const optButtons = quizBox.querySelectorAll(".quiz-opt-btn");
    const nextBtn = quizBox.querySelector("#quiz-next-btn");

    optButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (quizData.isAnswered) return; // Answer locked

        quizData.isAnswered = true;
        const selectedIdx = parseInt(btn.dataset.index);

        if (selectedIdx === currentQ.correct) {
          btn.classList.add("correct");
          quizData.score++;
        } else {
          btn.classList.add("incorrect");
          // Highlight correct option too
          optButtons[currentQ.correct].classList.add("correct");
        }

        // Show Next button
        nextBtn.style.display = "block";
      });
    });

    nextBtn.addEventListener("click", () => {
      quizData.currentQuestion++;
      quizData.isAnswered = false;
      renderQuiz();
    });
  };

  renderQuiz();

  /* ==========================================================================
     GEJALA: SYMPTOM CHECKER & RISK ASSESSMENT CALCULATOR
     ========================================================================== */
  const symptomCards = document.querySelectorAll(".symptom-checkbox-card");
  const resultPanel = document.getElementById("symptom-result-container");

  const calculateRisk = () => {
    if (!resultPanel) return;

    const selectedSet = state.symptoms.selected;
    const list = state.symptoms.list;

    if (selectedSet.size === 0) {
      resultPanel.innerHTML = `
        <div class="result-status-indicator no-symptom">Belum Ada Gejala</div>
        <div class="result-explanation">
          <h3>Tidak Ada Gejala yang Dipilih</h3>
          <p>Silakan centang satu atau beberapa gejala di atas untuk memulai analisis risiko kesehatan pernapasan keluarga Anda.</p>
        </div>
      `;
      return;
    }

    let totalScore = 0;
    let hasSesak = false;

    selectedSet.forEach(symptomKey => {
      if (list[symptomKey]) {
        totalScore += list[symptomKey].weight;
        if (symptomKey === "sesak") {
          hasSesak = true;
        }
      }
    });

    let status = "low";
    let statusLabel = "Risiko Ringan";
    let explTitle = "Kemungkinan Flu Biasa / ISPA Ringan";
    let explDesc = "Gejala Anda tergolong ringan. Disarankan istirahat yang cukup di rumah, konsumsi makanan bergizi, minum air hangat minimal 2 liter per hari, dan isolasi mandiri agar tidak menulari anggota keluarga lainnya.";
    let actionLabel = "Tips Perawatan Mandiri";
    let actionType = "tips";

    // High risk triggers: Sesak napas OR total score >= 6
    if (hasSesak || totalScore >= 6) {
      status = "high";
      statusLabel = "Risiko Tinggi (Bahaya)";
      explTitle = "Segera Lakukan Pemeriksaan Medis!";
      explDesc = "PERINGATAN: Adanya sesak napas atau akumulasi gejala berat merupakan indikasi bahaya ISPA (Pneumonia). Jangan tunda pemeriksaan medis. Segera kunjungi Instalasi Gawat Darurat (IGD) atau Puskesmas terdekat!";
      actionLabel = "Temukan Faskes Terdekat";
      actionType = "find_clinic";
    }
    // Medium risk trigger
    else if (totalScore >= 3 && totalScore <= 5) {
      status = "medium";
      statusLabel = "Risiko Sedang";
      explTitle = "ISPA Sedang - Butuh Observasi";
      explDesc = "Gejala Anda memerlukan perhatian. Disarankan melakukan konsultasi dengan dokter umum di klinik/puskesmas untuk mencegah keparahan gejala, serta mengonsumsi obat penurun demam atau pereda batuk sesuai resep.";
      actionLabel = "Konsultasi Dokter";
      actionType = "consult";
    }

    resultPanel.innerHTML = `
      <div class="result-status-indicator ${status}">${statusLabel}</div>
      <div class="result-explanation">
        <h3>${explTitle}</h3>
        <p>${explDesc}</p>
        <button class="result-action-btn" id="symptom-action-btn" data-action="${actionType}">
          ${actionLabel}
        </button>
      </div>
    `;

    // Add action listener to results button
    document.getElementById("symptom-action-btn").addEventListener("click", (e) => {
      const act = e.currentTarget.dataset.action;
      if (act === "find_clinic") {
        switchTab("klinik");
      } else if (act === "consult") {
        openModal("Konsultasi Dokter Online", `
          <p>Anda akan terhubung ke layanan telemedicine puskesmas mitra terdekat untuk konsultasi jarak jauh gratis.</p>
          <div style="background:#f1f5f9; padding:12px; border-radius:8px; margin: 12px 0;">
            <p style="margin:0; font-weight:700; color:var(--primary);">Nomor Telekonsultasi ISPA:</p>
            <p style="font-size:1.1rem; font-weight:800; margin:4px 0; color:#1e293b;">0811-1900-5670</p>
          </div>
          <button class="booking-submit-btn" onclick="document.getElementById('modal-overlay').classList.remove('active')">Tutup</button>
        `);
      } else {
        openModal("Panduan Perawatan ISPA Ringan di Rumah", `
          <ul>
            <li><strong>Hidrasi Optimal:</strong> Minum air putih hangat 8-10 gelas sehari untuk mengencerkan lendir.</li>
            <li><strong>Istirahat Total:</strong> Tidur minimal 8 jam untuk membantu sistem kekebalan tubuh memulihkan diri.</li>
            <li><strong>Udara Hangat:</strong> Hirup uap air panas yang dicampur sedikit minyak kayu putih untuk melegakan hidung mampet.</li>
            <li><strong>Terapi Madu:</strong> Konsumsi 1 sendok teh madu dicampur jeruk nipis untuk menenangkan tenggorokan teriritasi (khusus usia >1 tahun).</li>
          </ul>
          <button class="booking-submit-btn" onclick="document.getElementById('modal-overlay').classList.remove('active')">Mengerti</button>
        `);
      }
    });
  };

  symptomCards.forEach(card => {
    card.addEventListener("click", () => {
      const symptomKey = card.dataset.symptom;

      if (state.symptoms.selected.has(symptomKey)) {
        state.symptoms.selected.delete(symptomKey);
        card.classList.remove("selected");
      } else {
        state.symptoms.selected.add(symptomKey);
        card.classList.add("selected");
      }

      calculateRisk();
    });
  });

  calculateRisk(); // Initialize state description

  /* ==========================================================================
     PENCEGAHAN: CHECKLIST & ANIMATED PROGRESS RING
     ========================================================================== */
  const checklistBox = document.getElementById("checklist-container");
  const progressCircle = document.getElementById("progress-bar-circle");
  const progressText = document.getElementById("progress-percent");
  const progressLabel = document.getElementById("progress-label-desc");

  // Renders the checkboxes list
  const renderChecklist = () => {
    if (!checklistBox) return;
    checklistBox.innerHTML = state.prevention.checklist.map((item, index) => `
      <div class="checklist-item ${item.completed ? 'checked' : ''}" data-index="${index}">
        <div class="checklist-checkbox">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div class="checklist-content">
          <h5>${item.label}</h5>
          <p>${item.desc}</p>
        </div>
      </div>
    `).join("");

    // Bind click events
    checklistBox.querySelectorAll(".checklist-item").forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.dataset.index);
        state.prevention.checklist[idx].completed = !state.prevention.checklist[idx].completed;
        renderChecklist();
        updatePreventionProgress();
      });
    });
  };

  // Calculates and animates the SVG circular progress ring
  const updatePreventionProgress = () => {
    const checklist = state.prevention.checklist;
    const completedCount = checklist.filter(i => i.completed).length;
    const percent = Math.round((completedCount / checklist.length) * 100);

    if (progressText) progressText.textContent = `${percent}%`;
    if (progressLabel) progressLabel.textContent = `${completedCount} dari ${checklist.length} tindakan pencegahan harian dilakukan.`;

    if (progressCircle) {
      const circ = 170; // Circumference of circle
      const offset = circ - (percent / 100) * circ;
      progressCircle.style.strokeDashoffset = offset;
    }
  };

  renderChecklist();
  updatePreventionProgress();

  // Handwashing Guide Slider Controller
  const stepIcon = document.getElementById("handwash-step-icon");
  const stepTitle = document.getElementById("handwash-step-title");
  const stepDesc = document.getElementById("handwash-step-desc");
  const prevBtn = document.getElementById("handwash-prev");
  const nextBtn = document.getElementById("handwash-next");
  const dotsContainer = document.getElementById("handwash-dots");

  const updateHandwashUI = () => {
    if (!dotsContainer) return;
    const pData = state.prevention;
    const currentStep = pData.handwashSteps[pData.handwashStep];

    // Update texts & icons
    stepIcon.textContent = currentStep.icon;
    stepTitle.textContent = currentStep.title;
    stepDesc.textContent = currentStep.desc;

    // Manage buttons disabled state
    prevBtn.disabled = pData.handwashStep === 0;
    nextBtn.disabled = pData.handwashStep === pData.handwashSteps.length - 1;

    // Render dot indicators
    dotsContainer.innerHTML = pData.handwashSteps.map((_, i) => `
      <span class="step-indicator-dot ${i === pData.handwashStep ? 'active' : ''}"></span>
    `).join("");
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      if (state.prevention.handwashStep > 0) {
        state.prevention.handwashStep--;
        updateHandwashUI();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (state.prevention.handwashStep < state.prevention.handwashSteps.length - 1) {
        state.prevention.handwashStep++;
        updateHandwashUI();
      }
    });

    updateHandwashUI(); // Initial run
  }

  /* ==========================================================================
     KLINIK: SEARCH, FILTERS, AND BOOKING SIMULATOR
     ========================================================================== */
  const searchInput = document.getElementById("clinic-search");
  const filterTabs = document.querySelectorAll(".filter-tabs-container .filter-tab");
  const clinicListBox = document.getElementById("clinic-list-container");

  const renderClinics = () => {
    if (!clinicListBox) return;

    const query = state.clinics.searchQuery.toLowerCase();
    const filter = state.clinics.activeFilter;

    // Apply combined filter & search query
    const filteredClinics = state.clinics.data.filter(clinic => {
      const matchType = (filter === "all" || clinic.type === filter);
      const matchSearch = (clinic.name.toLowerCase().includes(query) || clinic.address.toLowerCase().includes(query));
      return matchType && matchSearch;
    });

    if (filteredClinics.length === 0) {
      clinicListBox.innerHTML = `
        <div class="no-clinic-found">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <p>Tidak ada klinik atau fasilitas kesehatan yang sesuai dengan kata kunci pencarian Anda.</p>
        </div>
      `;
      return;
    }

    clinicListBox.innerHTML = filteredClinics.map(clinic => `
      <div class="clinic-card">
        <div class="clinic-card-header">
          <span class="clinic-type-badge ${clinic.type}">${clinic.type === 'rsud' ? 'RSUD' : clinic.type}</span>
          <span class="clinic-open-status">${clinic.open}</span>
        </div>
        <h4>${clinic.name}</h4>
        <div class="clinic-detail-line">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span>${clinic.address}</span>
        </div>
        <div class="clinic-detail-line">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 00.94.725V17a2 2 0 01-2 2h-2C9.716 19 3 12.284 3 4V5z"></path></svg>
          <span>Hubungi: ${clinic.phone}</span>
        </div>
        <div class="clinic-card-footer">
          <div class="clinic-rating">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${clinic.rating}</span>
            <span style="font-weight: normal; color: var(--text-muted); font-size: 0.65rem;">(BPJS ${clinic.bpjs ? '✔' : '✘'})</span>
          </div>
          <button class="clinic-booking-btn" data-id="${clinic.id}">Daftar Antrean</button>
        </div>
      </div>
    `).join("");

    // Bind Booking Clicks
    clinicListBox.querySelectorAll(".clinic-booking-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const cId = parseInt(btn.dataset.id);
        const selectedClinic = state.clinics.data.find(c => c.id === cId);
        openBookingModal(selectedClinic);
      });
    });
  };

  // Bind Search Field Keyup
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.clinics.searchQuery = e.target.value;
      renderClinics();
    });
  }

  // Bind Category Filter Click Events
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.clinics.activeFilter = tab.dataset.filter;
      renderClinics();
    });
  });

  // Booking Modal Flow
  const openBookingModal = (clinic) => {
    const bookingHtml = `
      <form id="booking-simulation-form">
        <div class="booking-form-group">
          <label>Fasilitas Kesehatan Pilihan</label>
          <input type="text" value="${clinic.name}" disabled style="background: #f1f5f9; font-weight:700;">
        </div>
        <div class="booking-form-group">
          <label>Nama Pasien (Sesuai KTP/KIA)</label>
          <input type="text" id="booking-patient-name" placeholder="Masukkan nama lengkap" required>
        </div>
        <div class="booking-form-group">
          <label>Jenis Layanan Medis</label>
          <select id="booking-service-type">
            <option value="Poli Umum & ISPA">Poli Umum / Penanganan ISPA</option>
            <option value="Poli Anak (Balita)">Poli Anak (Tumbuh Kembang & Imunisasi)</option>
            <option value="Vaksinasi PCV/Flu">Vaksinasi PCV / Influenza</option>
            <option value="Konsultasi Spesialis Paru">Konsultasi Spesialis Paru (Rujukan)</option>
          </select>
        </div>
        <div class="booking-form-group">
          <label>Metode Pembayaran</label>
          <select id="booking-payment">
            ${clinic.bpjs ? '<option value="BPJS Kesehatan">BPJS Kesehatan (Gratis)</option>' : ''}
            <option value="Mandiri (Umum)">Umum / Pembayaran Mandiri</option>
          </select>
        </div>
        <div class="booking-form-group">
          <label>Pilih Tanggal Kunjungan</label>
          <input type="date" id="booking-date" required>
        </div>
        <button type="submit" class="booking-submit-btn">Kirim & Dapatkan Nomor Antrean</button>
      </form>
    `;

    openModal("Formulir Pendaftaran Antrean Online", bookingHtml);

    // Set minimum date to today
    const dateInput = document.getElementById("booking-date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;

    // Handle Form Submission inside the Modal
    document.getElementById("booking-simulation-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const patientName = document.getElementById("booking-patient-name").value;
      const serviceType = document.getElementById("booking-service-type").value;
      const paymentMethod = document.getElementById("booking-payment").value;
      const visitDate = document.getElementById("booking-date").value;

      // Generate Ticket Info
      const queueNumber = `ISPA-${String(Math.floor(Math.random() * 89) + 10).padStart(3, "0")}`;
      const bookingTime = new Date().toLocaleString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";

      const successHtml = `
        <div class="success-animation-box" id="success-animation-box">
          <div class="success-icon-wrapper">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 style="font-family:var(--font-heading); color:#059669; font-size:1.25rem;">Pendaftaran Berhasil!</h3>
          <p style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Tunjukkan tiket ini saat tiba di loket pelayanan.</p>
          
          <div class="success-ticket-details">
            <div class="ticket-row" style="border-bottom: 2px dashed #e2e8f0; padding-bottom: 10px; margin-bottom: 12px; text-align:center; display:block;">
              <span class="ticket-label" style="display:block; font-size:0.6rem; text-transform:uppercase; letter-spacing:1px;">Nomor Antrean Anda:</span>
              <span class="ticket-value" style="font-size:1.8rem; color:var(--primary); font-family:var(--font-heading); font-weight:800; display:block; margin-top:4px;">${queueNumber}</span>
            </div>
            <div class="ticket-row">
              <span class="ticket-label">Fasilitas Kesehatan:</span>
              <span class="ticket-value">${clinic.name}</span>
            </div>
            <div class="ticket-row">
              <span class="ticket-label">Nama Pasien:</span>
              <span class="ticket-value">${patientName}</span>
            </div>
            <div class="ticket-row">
              <span class="ticket-label">Layanan Medis:</span>
              <span class="ticket-value">${serviceType}</span>
            </div>
            <div class="ticket-row">
              <span class="ticket-label">Cara Bayar:</span>
              <span class="ticket-value">${paymentMethod}</span>
            </div>
            <div class="ticket-row">
              <span class="ticket-label">Tanggal Kunjungan:</span>
              <span class="ticket-value">${visitDate}</span>
            </div>
            <div class="ticket-row" style="margin-top:10px; padding-top:10px; border-top:1px solid #e2e8f0; font-size:0.65rem; color:var(--text-muted); display:flex; justify-content:space-between;">
              <span>Waktu Daftar: ${bookingTime}</span>
              <span style="font-weight:700; color:var(--success);">Status: AKTIF</span>
            </div>
          </div>

          <button class="booking-submit-btn" style="background:var(--success);" onclick="document.getElementById('modal-overlay').classList.remove('active')">Selesai & Simpan</button>
        </div>
      `;

      openModal("Tiket Konfirmasi Antrean", successHtml);
      triggerConfetti();
    });
  };

  // Fun confetti trigger inside the app mockup frame!
  const triggerConfetti = () => {
    const successBox = document.getElementById("success-animation-box");
    if (!successBox) return;

    for (let i = 0; i < 40; i++) {
      const conf = document.createElement("div");
      conf.classList.add("confetti");
      
      // Random coordinates & colors
      conf.style.left = `${Math.random() * 100}%`;
      conf.style.top = `-10px`;
      conf.style.backgroundColor = ["#00b4d8", "#06d6a0", "#ff9f1c", "#ff4d4d", "#0266cc"][Math.floor(Math.random() * 5)];
      conf.style.width = `${Math.random() * 6 + 4}px`;
      conf.style.height = `${Math.random() * 6 + 4}px`;
      conf.style.animationDelay = `${Math.random() * 1.5}s`;
      conf.style.animationDuration = `${Math.random() * 1.5 + 1.5}s`;
      
      successBox.appendChild(conf);

      // Remove after animation finishes
      setTimeout(() => {
        conf.remove();
      }, 3000);
    }
  };

  // Initial load components for single page web layout
  updatePreventionProgress();
  renderClinics();

  // Obfuscated WhatsApp Consultation Link (Anti-bot scraping)
  const waBtn = document.getElementById("wa-consult-btn");
  if (waBtn) {
    waBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Base64 Encoded WhatsApp Number
      const secret = "NjI4NTI5OTk0MzAwMw=="; 
      const realNumber = atob(secret);
      const msg = encodeURIComponent("Halo petugas kesehatan Pustu Desa Bapangi, saya ingin berkonsultasi mengenai ISPA");
      window.open(`https://wa.me/${realNumber}?text=${msg}`, "_blank");
    });
  }
});
