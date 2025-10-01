import "./Settings.css";

interface ClockSettings {
  is24Hour: boolean;
  showSeconds: boolean;
  brightness: number;
  showSeam: boolean;
}

interface SettingsProps {
  isOpen: boolean;
  onToggle: () => void;
  settings: ClockSettings;
  onSettingsChange: (settings: ClockSettings) => void;
}

const Settings = ({
  isOpen,
  onToggle,
  settings,
  onSettingsChange,
}: SettingsProps) => {
  const handleSettingChange = (
    key: keyof ClockSettings,
    value: boolean | number
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <>
      <button
        className="settings-toggle"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label="Settings"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
          <div className="settings-content">
            <h3>Clock Settings</h3>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.is24Hour}
                  onChange={(e) =>
                    handleSettingChange("is24Hour", e.target.checked)
                  }
                />
                24-Hour Format
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.showSeconds}
                  onChange={(e) =>
                    handleSettingChange("showSeconds", e.target.checked)
                  }
                />
                Show Seconds
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.showSeam}
                  onChange={(e) =>
                    handleSettingChange("showSeam", e.target.checked)
                  }
                />
                Show Flip Seam
              </label>
            </div>

            <div className="setting-item">
              <label>
                Brightness: {Math.round(settings.brightness * 100)}%
                <input
                  type="range"
                  min="0.2"
                  max="1"
                  step="0.1"
                  value={settings.brightness}
                  onChange={(e) =>
                    handleSettingChange(
                      "brightness",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
