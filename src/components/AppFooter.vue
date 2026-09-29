<template>
    <footer class="border-t border-background-border bg-background py-8">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div class="flex items-center gap-1 font-mono text-sm tracking-tight text-white">
                    <span class="font-bold text-zinc-500">Arri</span>
                    <span class="font-bold text-brand">[</span>
                    <span class="text-zinc-300 font-semibold">RPC</span>
                    <span class="font-bold text-brand">]</span>
                </div>
                <p class="text-xs text-zinc-500 md:order-1">
                    &copy; {{ new Date().getFullYear() }} ARRI-RPC project. Licensed under MIT.
                </p>
                <div class="flex gap-6 text-sm text-zinc-400">
                    <a href="https://github.com/modii-dev/arri" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">GitHub</a>
                    <a href="https://discord.gg/5m23HEQss7" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Discord</a>
                </div>
            </div>
        </div>
    </footer>
</template>
