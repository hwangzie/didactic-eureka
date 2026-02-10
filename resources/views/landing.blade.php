@extends('layouts.app')

@push('styles')
@vite(['resources/css/pixel-office.css'])
@endpush

@section('content')
<x-pixel-office :visitor-count="$visitorCount" title="Mageran Virtual Job Fair">
    <div class="text-center mt-4">
        <button class="btn btn-warning btn-lg pixel-font" style="font-size:0.7rem" id="joinBtn">
            🚀 Join the Office!
        </button>
    </div>
</x-pixel-office>
@endsection

@push('scripts')
@vite(['resources/js/pixel-office.js'])
<script>
document.addEventListener('DOMContentLoaded', () => {
    const office = new PixelOffice({
        visitorCount: {{ $visitorCount }},
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
@endpush