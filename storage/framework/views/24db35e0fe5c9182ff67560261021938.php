<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['visitorCount' => 0, 'title' => 'Virtual Office']));

foreach ($attributes->all() as $__key => $__value) {
    if (in_array($__key, $__propNames)) {
        $$__key = $$__key ?? $__value;
    } else {
        $__newAttributes[$__key] = $__value;
    }
}

$attributes = new \Illuminate\View\ComponentAttributeBag($__newAttributes);

unset($__propNames);
unset($__newAttributes);

foreach (array_filter((['visitorCount' => 0, 'title' => 'Virtual Office']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<section class="community-section" data-visitor-count="<?php echo e($visitorCount); ?>">
    <div class="container-fluid">
        <div class="section-header">
            <h2 class="section-title"><?php echo e($title); ?></h2>
            <div class="visitor-counter">
                <i class="bi bi-people-fill me-2"></i>
                <span id="visitorCount"><?php echo e(number_format($visitorCount)); ?></span> Registran Hadir
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
                            <div class="stat-value" id="totalMembers"><?php echo e(number_format($visitorCount)); ?></div>
                            <div class="stat-label">Jumlah Registran</div>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <span class="stat-icon">🏃</span>
                        <div>
                            <div class="stat-value" id="activeNow"><?php echo e(min($visitorCount, 50)); ?></div>
                            <div class="stat-label">Sedang Mencari Kerja</div>
                        </div>
                    </div>

                    <?php echo e($slot); ?>

                </div>
            </div>
        </div>
    </div>
</section><?php /**PATH F:\laragon\www\community-stats\resources\views/components/pixel-office.blade.php ENDPATH**/ ?>