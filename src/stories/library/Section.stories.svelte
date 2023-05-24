<script lang="ts">
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import { Section } from "$violet/components";
  </script>
  
  <Meta title="Library/Layout/Section" component={Section} tags="autodocs" />
  
  <Template let:args>
    <Section {...args}>
		<div slot="section">Content goes here</div>
	</Section>
  </Template>
  
  <Story name="Default" />
  