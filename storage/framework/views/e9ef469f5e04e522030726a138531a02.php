<div class="stats-panel">
    <h4 class="text-warning mb-4">📊 Community Stats</h4>
    
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

    <div class="text-center mt-4">
        <button class="btn btn-warning btn-lg" onclick="addVisitor()">🚀 Join!</button>
    </div>
</div><?php /**PATH F:\laragon\www\community-stats\resources\views/partials/stats-panel.blade.php ENDPATH**/ ?>