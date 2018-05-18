﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Takealot.ViewModel;
using Xamarin.Forms;

namespace Takealot
{
    public partial class MainPage : MasterDetailPage
    {
		
        public MainPage()
        {
			InitializeComponent();
			masterPage.ListView.ItemSelected += OnItemelected;
        }
        
		public void OnItemelected(object sender, SelectedItemChangedEventArgs e)
		{
			var item = e.SelectedItem as MasterPageItem;
			if(item != null)
			{
				Detail = new NavigationPage((Page)Activator.CreateInstance(item.TargetType));
				masterPage.ListView.SelectedItem = null;
				IsPresented = false;
			}
		}
	}
}
