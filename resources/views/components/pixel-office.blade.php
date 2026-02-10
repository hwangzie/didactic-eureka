@props(['visitorCount' => 0, 'title' => 'Virtual Office'])

<section class="community-section" data-visitor-count="{{ $visitorCount }}">
    <div class="container-fluid">
        <div class="section-header">
            <h2 class="section-title">{{ $title }}</h2>
            <div class="visitor-counter">
                <i class="bi bi-people-fill me-2"></i>
                <span id="visitorCount">{{ number_format($visitorCount) }}</span> Registran Hadir
            </div>
        </div>

        <div class="row justify-content-center align-items-start g-4">
            <div class="col-lg-8">
                <div class="office-wrapper">
                    <div class="office-container" id="officeContainer">
                        <div class="office-floor"></div>
                        <div class="office-wall"></div>
                        <div class="furniture-container" id="furnitureContainer"></div>
                        <div class="characters-container" id="charactersContainer"></div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="stats-panel">
                    <h4 class="pixel-font text-warning mb-4" style="font-size:0.9rem">📊 Community Stats</h4>
                    
                    <div class="stat-item">
                        <span class="stat-icon">👥</span>
                        <div>
                            <div class="stat-value" id="totalMembers">{{ number_format($visitorCount) }}</div>
                            <div class="stat-label">Jumlah Registran</div>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <span class="stat-icon">🏃</span>
                        <div>
                            <div class="stat-value" id="activeNow">{{ min($visitorCount, 50) }}</div>
                            <div class="stat-label">Sedang Mencari Kerja</div>
                        </div>
                    </div>

                    {{ $slot }}
                </div>
            </div>
        </div>
    </div>
</section>