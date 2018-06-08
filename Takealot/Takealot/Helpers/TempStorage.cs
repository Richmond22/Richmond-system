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

		public static string PaymentID
        {
            get
            {
                return AppSettings.GetValueOrDefault("PaymentID", "");
            }
            set
            {
                AppSettings.AddOrUpdateValue("PaymentID", value);
            }
        }
		public static string TotalP
        {
            get
            {
				return AppSettings.GetValueOrDefault("TotalP", "");
            }
            set
            {
				AppSettings.AddOrUpdateValue("TotalP", value);
            }
        }
		public static string products
        {
            get
            {
                return AppSettings.GetValueOrDefault("products", "");
            }
            set
            {
                AppSettings.AddOrUpdateValue("products", value);
            }
        }

		public static bool logged
        {
            get
            {
                return AppSettings.GetValueOrDefault("logged", false);
            }
            set
            {
                AppSettings.AddOrUpdateValue("logged", value);
            }
        }



    }
}
