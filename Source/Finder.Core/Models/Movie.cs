﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


//Attention: This class is only for POC!
namespace Finder.Core.Models
{
    public class Movie
    {
        //movie properties
        public String TitleName { get; set; }

        public String Description { get; set; }

        public DateTime ReleaseDate { get; set; }


        //constructor for movie with initial upload to DB by calling Push-method
        public Movie(String TitleName, String Description, DateTime ReleaseDate)
        {

            this.Description = Description;
            this.ReleaseDate = ReleaseDate;
            this.TitleName = TitleName;

            this.Push();
        }
        
        //empty contructor for movie
        public Movie() { }


        //pushing the movie to the DB
        private void Push()
        {
            String query = $@"INSERT INTO table_name (column1, column2, column3, ...) VALUES({this.Description},{this.ReleaseDate},{this.TitleName});";
            DatabaseConnection q = new DatabaseConnection();
            q.QueryInsert(query);
        }
    }
}
