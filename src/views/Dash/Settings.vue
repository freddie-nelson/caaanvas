<template>
  <section class="text-t-main flex flex-col">
    <c-gradient-heading style="width: 8ch" :size="6" noscale>Settings</c-gradient-heading>

    <c-settings-group title="Appearance">
      <c-settings-setting name="Theme">
        <c-input-dropdown v-model="theme" :options="themes" />
      </c-settings-setting>

      <c-settings-setting name="UI Scale">
        <c-input-range
          v-model="uiScale"
          :height="14"
          width="min(44rem, 100%)"
          :min="0.5"
          :max="2"
          :step="0.25"
          color="var(--accent-500)"
          trackColor="var(--t-sub)"
          sticky
        />

        <div
          class="
            scale-container
            flex
            justify-between
            items-center
            text-t-main
            font-semibold
            text-lg
            mt-2.5
          "
          style="width: min(44rem, 100%)"
          ref="scaleContainer"
        >
          <p>0.5x</p>
          <p>0.75x</p>
          <p>1.0x</p>
          <p>1.25x</p>
          <p>1.5x</p>
          <p>1.75x</p>
          <p>2.0x</p>
        </div>
      </c-settings-setting>
    </c-settings-group>

    <c-settings-group title="Notifications">
      <c-settings-setting name="Desktop Notifications">
        <c-input-toggle v-model="allowDesktopNotifications" />
      </c-settings-setting>

      <c-settings-setting name="Email Alerts">
        <c-input-toggle v-model="allowEmailAlerts" />
      </c-settings-setting>
    </c-settings-group>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "@/store";

import CGradientHeading from "@/components/shared/Heading/CGradientHeading.vue";
import CInputToggle from "@/components/shared/Input/CInputToggle.vue";
import CSettingsGroup from "@/components/app/Dash/Settings/CSettingsGroup.vue";
import CSettingsSetting from "@/components/app/Dash/Settings/CSettingsSetting.vue";
import CInputRange from "@/components/shared/Input/CInputRange.vue";
import CInputDropdown from "@/components/shared/Input/CInputDropdown.vue";

export default defineComponent({
  name: "DashSettings",
  components: {
    CGradientHeading,
    CInputToggle,
    CSettingsGroup,
    CSettingsSetting,
    CInputRange,
    CInputDropdown,
  },
  setup() {
    const store = useStore();

    // Appearance Settings
    const themes = [
      "light",
      "dark",
      "solarized",
      "aether",
      "dracula",
      "horizon",
      "midnight",
      "paper",
    ];
    const theme = ref("light");

    const uiScale = ref(1);
    const scaleContainer = ref(document.createElement("div"));

    watch(uiScale, (val) => {
      const i = (val - 0.5) / 0.25;

      Array.from(scaleContainer.value.children).forEach((child) => {
        child.classList.remove("selected");
      });
      scaleContainer.value.children[i]?.classList.add("selected");
    });

    onMounted(() => {
      const i = (uiScale.value - 0.5) / 0.25;
      scaleContainer.value.children[i]?.classList.add("selected");
    });

    // Notfications Settings
    const allowDesktopNotifications = ref(false);

    watch(allowDesktopNotifications, async (allow) => {
      if (allow) {
        if (!("Notification" in window)) {
          store.commit("ADD_TOAST", {
            text: "🚫 Your browser does not support notifications.",
            duration: 3000,
          });
        }

        const permission = await Notification.requestPermission();

        if (permission === "denied") {
          store.commit("ADD_TOAST", {
            text: "🚫 Could not activate desktop notifications.",
            duration: 3000,
          });

          setTimeout(() => (allowDesktopNotifications.value = false), 400);
        }
      }
    });

    const allowEmailAlerts = ref(false);

    return {
      themes,
      theme,

      uiScale,
      scaleContainer,

      allowDesktopNotifications,
      allowEmailAlerts,
    };
  },
});
</script>

<style lang="scss" scoped>
.scale-container {
  margin-left: 0.75ch;

  p {
    width: 3ch;
    text-align: center;
    margin-left: -1.5ch;
    opacity: 0.5;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  p.selected {
    transform: scale(1.2);
    transform-origin: top center;
    opacity: 1;
  }
}
</style>