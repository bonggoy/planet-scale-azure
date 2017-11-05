﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Online.Store.ViewModels
{
    public class OrderViewModel
    {
        public OrderViewModel()
        {
            OrderDetails = new List<OrderDetailViewModel>();
        }
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime DateCreated { get; set; }

        public ICollection<OrderDetailViewModel> OrderDetails { get; set; }
    }

    public class OrderDetailViewModel
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
