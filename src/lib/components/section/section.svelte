<script lang="ts">
    // Your code here
    import clsx from "clsx";
    type T = $$Generic;
export let data: T[] = []
export let sectionWidth: "w-full" | "w-2/3" = "w-full"
$: className = clsx('flex flex-row border-transparent shadow-sm bg-additional-200 gap-4 h-full rounded-md p-4', sectionWidth, $$props.class);
</script>

<section class={className}>
    <slot/>
</section>
