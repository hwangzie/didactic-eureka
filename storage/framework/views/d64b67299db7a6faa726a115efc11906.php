

<?php $__env->startPush('styles'); ?>
<?php echo app('Illuminate\Foundation\Vite')(['resources/css/pixel-office.css']); ?>
<?php $__env->stopPush(); ?>

<?php $__env->startSection('content'); ?>
<?php if (isset($component)) { $__componentOriginal55315395f629682dc16835538aa9c989 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal55315395f629682dc16835538aa9c989 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.pixel-office','data' => ['visitorCount' => $visitorCount,'title' => 'Mageran Virtual Job Fair']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('pixel-office'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['visitor-count' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($visitorCount),'title' => 'Mageran Virtual Job Fair']); ?>
    <div class="text-center mt-4">
        <button class="btn btn-warning btn-lg pixel-font" style="font-size:0.7rem" id="joinBtn">
            🚀 Join the Office!
        </button>
    </div>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal55315395f629682dc16835538aa9c989)): ?>
<?php $attributes = $__attributesOriginal55315395f629682dc16835538aa9c989; ?>
<?php unset($__attributesOriginal55315395f629682dc16835538aa9c989); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal55315395f629682dc16835538aa9c989)): ?>
<?php $component = $__componentOriginal55315395f629682dc16835538aa9c989; ?>
<?php unset($__componentOriginal55315395f629682dc16835538aa9c989); ?>
<?php endif; ?>
<?php $__env->stopSection(); ?>

<?php $__env->startPush('scripts'); ?>
<?php echo app('Illuminate\Foundation\Vite')(['resources/js/pixel-office.js']); ?>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const office = new PixelOffice({
        visitorCount: <?php echo e($visitorCount); ?>,
        maxCharacters: 500,
        characterBasePath: '/images/character'
    });

    document.getElementById('joinBtn').addEventListener('click', () => {
        fetch('/track-visit')
            .then(r => r.json())
            .then(() => {
                const count = office.addCharacter();
                document.getElementById('visitorCount').textContent = count.toLocaleString();
                document.getElementById('totalMembers').textContent = count.toLocaleString();
                document.getElementById('activeNow').textContent = Math.min(count, 500);
            })
            .catch(console.error);
    });
});
</script>
<?php $__env->stopPush(); ?>
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH F:\laragon\www\community-stats\resources\views/landing.blade.php ENDPATH**/ ?>