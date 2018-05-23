using System;
using Plugin.Settings;
using Plugin.Settings.Abstractions;

namespace Takealot.Helpers
{
    public static class TempStorage
    {
		private static ISettings AppSettings
        {
            get
            {
                return CrossSettings.Current;
            }
        }

        #region Setting Constants

        private const string SettingsKey = "settings_key";
        private static readonly string SettingsDefault = string.Empty;

        #endregion


        public static string Username
        {
            get
            {
                return AppSettings.GetValueOrDefault("Username", "");
            }
            set
            {
                AppSettings.AddOrUpdateValue("Username", value);
            }
        }

		public static string CustomerID
        {
            get
            {
                return AppSettings.GetValueOrDefault("CustomerID", "");
            }
            set
            {
                AppSettings.AddOrUpdateValue("CustomerID", value);
            }
        }



    }
}
