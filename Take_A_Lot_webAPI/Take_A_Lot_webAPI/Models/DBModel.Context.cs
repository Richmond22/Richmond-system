﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Take_A_Lot_webAPI.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DBmodel : DbContext
    {
        public DBmodel()
            : base("name=DBmodel")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<driver> drivers { get; set; }
        public virtual DbSet<supplier> suppliers { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Tblcart> Tblcarts { get; set; }
        public virtual DbSet<Tblcustomer> Tblcustomers { get; set; }
        public virtual DbSet<Tblproduct> Tblproducts { get; set; }
        public virtual DbSet<Tbladdress> Tbladdresses { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<eft> efts { get; set; }
        public virtual DbSet<payment> payments { get; set; }
        public virtual DbSet<Tblcredit> Tblcredits { get; set; }
        public virtual DbSet<TblSchedule> TblSchedules { get; set; }
        public virtual DbSet<Tblorder> Tblorders { get; set; }
    }
}
