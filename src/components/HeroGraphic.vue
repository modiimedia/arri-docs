<template>
    <div class="relative flex h-[460px] w-[340px] sm:w-[500px] lg:w-[580px] items-center justify-center overflow-hidden select-none">
        <!-- Ambient Background Nebula Glows -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-brand/15 blur-[120px] animate-pulse-glow"></div>
            <div class="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-zinc-700/20 blur-[140px] animate-pulse-glow-reverse"></div>
        </div>

        <!-- 3D Overlapping IDE Windows Container -->
        <div class="relative w-full h-[400px] flex items-center justify-center">
            
            <!-- Window A: The Code Editor (Top Left) -->
            <div class="absolute top-4 left-4 z-20 w-[280px] sm:w-[380px] rounded-lg border border-background-border bg-[#0e0e12]/95 shadow-2xl shadow-black/80 backdrop-blur-md animate-editor-float">
                <!-- macOS Style Header Bar -->
                <div class="flex items-center justify-between border-b border-background-border/80 bg-background-card/90 px-4 py-3">
                    <div class="flex gap-1.5">
                        <span class="h-3 w-3 rounded-full bg-red-500/80"></span>
                        <span class="h-3 w-3 rounded-full bg-yellow-500/80 animate-pulse"></span>
                        <span class="h-3 w-3 rounded-full bg-green-500/80"></span>
                    </div>
                    <div class="font-mono text-[11px] text-zinc-500 font-semibold tracking-wide">server.ts &mdash; VSCode</div>
                    <div class="w-12"></div> <!-- Spacer to center title -->
                </div>

                <!-- Code Editor Lines -->
                <div class="p-5 font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-300">
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">1</span>
                        <span><span class="text-zinc-500">// Define an RPC procedure</span></span>
                    </div>
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">2</span>
                        <span><span class="text-brand">app</span>.<span class="text-blue-400">rpc</span>(<span class="text-emerald-400">"getUser"</span>, <span class="text-purple-400">defineRpc</span>({</span>
                    </div>
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">3</span>
                        <span class="pl-4">input: <span class="text-brand">a</span>.<span class="text-blue-400">object</span>({</span>
                    </div>
                    <!-- Animated typing line -->
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">4</span>
                        <span class="pl-8 inline-flex items-center">
                            <span class="text-zinc-400 animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-brand pr-1">
                                id: a.string()
                            </span>
                        </span>
                    </div>
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">5</span>
                        <span class="pl-4">}),</span>
                    </div>
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">6</span>
                        <span class="pl-4">output: <span class="text-brand">UserSchema</span>,</span>
                    </div>
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">7</span>
                        <span class="pl-4"><span class="text-purple-400">handler</span>({ <span class="text-orange-400">input</span> }) {</span>
                    </div>
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">8</span>
                        <span class="pl-8"><span class="text-purple-400">return</span> db.<span class="text-blue-400">find</span>(input.id);</span>
                    </div>
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">9</span>
                        <span class="pl-4">}</span>
                    </div>
                    <div class="flex gap-4">
                        <span class="text-zinc-600 select-none">10</span>
                        <span>}));</span>
                    </div>
                </div>
            </div>

            <!-- Window B: The Terminal Output (Bottom Right) -->
            <div class="absolute bottom-4 right-4 z-10 w-[260px] sm:w-[350px] rounded-lg border border-brand/20 bg-background-card/95 shadow-2xl shadow-brand/5 backdrop-blur-md animate-terminal-float">
                <!-- macOS Style Header Bar -->
                <div class="flex items-center justify-between border-b border-background-border/80 bg-background/90 px-4 py-3">
                    <div class="flex gap-1.5">
                        <span class="h-3 w-3 rounded-full bg-zinc-800"></span>
                        <span class="h-3 w-3 rounded-full bg-zinc-800"></span>
                        <span class="h-3 w-3 rounded-full bg-zinc-800"></span>
                    </div>
                    <div class="font-mono text-[11px] text-zinc-400 font-semibold tracking-wide">bash &mdash; arri dev</div>
                    <div class="w-12"></div>
                </div>

                <!-- Terminal logs -->
                <div class="p-5 font-mono text-[10px] sm:text-[11px] leading-relaxed text-zinc-400">
                    <div class="text-zinc-500">$ npx arri dev</div>
                    <div class="text-zinc-300"><span class="text-blue-400 font-semibold">ℹ</span> Starting local development server...</div>
                    <div class="text-zinc-300"><span class="text-blue-400 font-semibold">ℹ</span> Server listening on port 3000</div>
                    <div class="text-zinc-300"><span class="text-blue-400 font-semibold">ℹ</span> Watching for schema changes...</div>
                    
                    <!-- Compilation triggered logging (Delayed / Pulsing fade-in) -->
                    <div class="mt-2 text-zinc-500 animate-log-timestamp">[17:00:12] File server.ts updated</div>
                    <div class="text-emerald-400 font-medium animate-log-success-1">✔ Generated TypeScript Client <span class="text-zinc-500 font-normal">(4ms)</span></div>
                    <div class="text-emerald-400 font-medium animate-log-success-2">✔ Generated Go Client Client <span class="text-zinc-500 font-normal">(7ms)</span></div>
                    <div class="text-emerald-400 font-medium animate-log-success-3">✔ Generated Rust Client Client <span class="text-zinc-500 font-normal">(11ms)</span></div>
                    
                    <!-- Blinking command prompt cursor -->
                    <div class="mt-2 flex items-center gap-1 font-semibold text-zinc-200">
                        <span>$</span>
                        <span class="h-3.5 w-1.5 bg-brand animate-cursor-blink"></span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style scoped>
/* Floating motions for IDE windows (Staggered offsets to create three-dimensional parallex) */
@keyframes floatEditor {
    0%, 100% {
        transform: translateY(0) rotate(-0.5deg);
    }
    50% {
        transform: translateY(-8px) rotate(0.2deg);
    }
}
.animate-editor-float {
    animation: floatEditor 6s ease-in-out infinite;
}

@keyframes floatTerminal {
    0%, 100% {
        transform: translateY(0) rotate(0.5deg);
    }
    50% {
        transform: translateY(8px) rotate(-0.2deg);
    }
}
.animate-terminal-float {
    animation: floatTerminal 6s ease-in-out infinite;
}

/* Background pulse glow keyframes */
@keyframes glowPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.8;
    }
    50% {
        transform: scale(1.05);
        opacity: 1.1;
    }
}
.animate-pulse-glow {
    animation: glowPulse 5s ease-in-out infinite;
}
.animate-pulse-glow-reverse {
    animation: glowPulse 6s ease-in-out infinite reverse;
}

/* Simulated cursor typing id: a.string() */
@keyframes type {
    0%, 10% { width: 0; }
    40%, 90% { width: 90px; } /* type out */
    95%, 100% { width: 0; } /* delete */
}
.animate-typewriter {
    animation: type 7s steps(14) infinite;
    display: inline-block;
    vertical-align: middle;
}

/* Terminal blink cursor */
@keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
}
.animate-cursor-blink {
    animation: blink 1s step-end infinite;
}

/* Delayed terminal log displays triggered by compilation typewriter */
@keyframes logTimestamp {
    0%, 40% { opacity: 0; transform: translateY(4px); }
    45%, 90% { opacity: 1; transform: translateY(0); }
    95%, 100% { opacity: 0; }
}
.animate-log-timestamp {
    animation: logTimestamp 7s ease-out infinite;
}

@keyframes logSuccess1 {
    0%, 46% { opacity: 0; transform: translateY(4px); }
    51%, 90% { opacity: 1; transform: translateY(0); }
    95%, 100% { opacity: 0; }
}
.animate-log-success-1 {
    animation: logSuccess1 7s ease-out infinite;
}

@keyframes logSuccess2 {
    0%, 51% { opacity: 0; transform: translateY(4px); }
    56%, 90% { opacity: 1; transform: translateY(0); }
    95%, 100% { opacity: 0; }
}
.animate-log-success-2 {
    animation: logSuccess2 7s ease-out infinite;
}

@keyframes logSuccess3 {
    0%, 56% { opacity: 0; transform: translateY(4px); }
    61%, 90% { opacity: 1; transform: translateY(0); }
    95%, 100% { opacity: 0; }
}
.animate-log-success-3 {
    animation: logSuccess3 7s ease-out infinite;
}
</style>
