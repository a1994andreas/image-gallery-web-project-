/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Andreas
 */
import cs359db.db.*;

public class MyAccountDB {
    
    public static void deleteAllusers()  throws ClassNotFoundException{
           try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("DELETE FROM user ; ");

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#DB: The member was successfully updated in the database.");

                // Close connection
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(Account.class.getName()).log(Level.SEVERE, null, ex);
        }
    System.out.println("DELETE ALL USERS DONE");
    }
    
    
      public static String  getAllUsers() throws ClassNotFoundException {
         System.out.println("-----PRINT ALL USERS-----\n");
         String ret_val="";
        try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("SELECT * FROM user ;");
                     

                stmt.execute(insQuery.toString());

                ResultSet res = stmt.getResultSet();
                int counter =0;
                
                while(res.next() ) {
                    
                    
                    
                    
                    ret_val+="<tr>"   
                     +"<td class='table_rows' tag='"+res.getString("userName")+"'>"+res.getString("userName")+"</td>"
                     +"<td class='table_rows'>"+res.getString("email")+"</td>"
                     +"<td class='table_rows'>"+res.getString("firstName")+"</td>"
                     +"<td class='table_rows'>"+res.getString("lastName")+"</td>"
                     +"<td class='table_rows'>"+res.getString("gender")+"</td>"
                     +"<td class='table_rows'>"+res.getString("birthDate")+"</td>"
                     +"<td class='table_rows'>"+res.getString("country")+"</td>"
                     +"<td class='table_rows'>"+res.getString("town")+"</td>"

                    +"</tr>";
                   
               
                }

                // Close connection
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(cs359db.model.User.class.getName()).log(Level.SEVERE, null, ex);
        }         
        
        System.out.println("-----PRINT ALL USERS DONE-----");

                return ret_val;

 
    }
      
       public static void  printAllUsers() throws ClassNotFoundException {
         System.out.println("-----PRINT ALL USERS-----\n");
        cs359db.model.User user = new cs359db.model.User();
        try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("SELECT * FROM user ;");
                     

                stmt.execute(insQuery.toString());

                ResultSet res = stmt.getResultSet();
                int counter =0;
                
                while(res.next() ) {
                    System.out.println("USER"+ (++counter));
                     System.out.println("Username: "+res.getString("userName"));
                     System.out.println("email: "+res.getString("email"));
                     System.out.println("password: "+res.getString("password"));
                     System.out.println("firstname: "+res.getString("firstName"));
                     System.out.println("lastname: "+res.getString("lastName"));
                     System.out.println("gender: "+res.getString("gender"));
                     System.out.println("birthdate: "+res.getString("birthDate"));
                     System.out.println("country: "+res.getString("country"));
                    System.out.println("town: "+res.getString("town"));
                    System.out.println("additional: "+res.getString("additional")+"\n");
               
                }

                // Close connection
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(cs359db.model.User.class.getName()).log(Level.SEVERE, null, ex);
        }         
        
        System.out.println("-----PRINT ALL USERS DONE-----");

 
    }
      
    
    public static Account getUser(String userName) throws ClassNotFoundException {
        Account user = new Account();
        try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("SELECT * FROM user ")
                        .append(" WHERE ")
                        .append(" USERNAME = ").append("'").append(userName).append("';");

                stmt.execute(insQuery.toString());

                ResultSet res = stmt.getResultSet();

                if (res.next() == true) {
                    user.setUsername(res.getString("userName"));
                    user.setEmail(res.getString("email"));
                    user.setPassword(res.getString("password"));
                    user.setFirstname(res.getString("firstName"));
                    user.setLastname(res.getString("lastName"));
                    user.setGender(res.getString("gender"));
                    user.setDate_of_birth(res.getString("birthDate"));
                    user.setCountry(res.getString("country"));
                    user.setCity(res.getString("town"));
                    user.setExtra_info(res.getString("additional"));
                }

                // Close connection
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(Account.class.getName()).log(Level.SEVERE, null, ex);
        }

        return user;
    }
      
      public static boolean addUser(Account user) throws ClassNotFoundException {
       
        try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();
                   if(!checkValidUserName(user.getUsername())){
                       return false;
                   }
                insQuery.append("INSERT INTO ")
                        .append(" user (USERNAME, EMAIL, PASSWORD, FIRSTNAME, LASTNAME, BIRTHDATE, GENDER, COUNTRY, TOWN, ADDITIONAL) ")
                        .append(" VALUES (")
                        .append("'").append(user.getUsername()).append("',")
                        .append("'").append(user.getEmail()).append("',")
                        .append("'").append(user.getPassword()).append("',")
                        .append("'").append(user.getFirstname()).append("',")
                        .append("'").append(user.getLastname()).append("',")
                        .append("'").append(user.getDate_of_birth()).append("',")
                        .append("'").append(user.getGender()).append("',")
                        .append("'").append(user.getCountry()).append("',")
                        .append("'").append(user.getCity()).append("',")
                        .append("'").append(user.getExtra_info()).append("');");

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#DB: The member was successfully added in the database.");

                // Close connection
                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(Account.class.getName()).log(Level.SEVERE, null, ex);
        }
        return true;
    } 
      
       public static void updateUser(Account user) throws ClassNotFoundException {
       
        try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("UPDATE user ")
                        .append(" SET ")
                        .append(" PASSWORD = ").append("'").append(user.getPassword()).append("',")
                        .append(" FIRSTNAME = ").append("'").append(user.getFirstname()).append("',")
                        .append(" LASTNAME = ").append("'").append(user.getLastname()).append("',")
                        .append(" BIRTHDATE = ").append("'").append(user.getDate_of_birth()).append("',")
                        .append(" GENDER = ").append("'").append(user.getGender()).append("',")
                        .append(" COUNTRY = ").append("'").append(user.getCountry()).append("',")
                        .append(" TOWN = ").append("'").append(user.getCity()).append("',")
                        .append(" ADDITIONAL = ").append("'").append(user.getExtra_info()).append("'")
                        .append(" WHERE USERNAME = ").append("'").append(user.getUsername()).append("'")
                        .append(" AND EMAIL = ").append("'").append(user.getEmail()).append("';");

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#DB: The member was successfully updated in the database.");

                // Close connection
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(Account.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
      
       
    public static void deleteUser(Account user) throws ClassNotFoundException {

        try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("DELETE FROM user ")
                        .append(" WHERE ")
                        .append(" USERNAME = ").append("'").append(user.getUsername()).append("',")
                        .append(" EMAIL = ").append("'").append(user.getEmail()).append("';");

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#DB: The member was successfully deleted from the database.");

                // Close connection
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(Account.class.getName()).log(Level.SEVERE, null, ex);
        }   
    }
    
      public static void deleteUser(String userName, String email) throws ClassNotFoundException {

        try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("DELETE FROM user ")
                        .append(" WHERE ")
                        .append(" USERNAME = ").append("'").append(userName).append("';");
                       // .append(" EMAIL = ").append("'").append(email).append("';");

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#DB: The member was successfully deleted from the database.");

                // Close connection
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(Account.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
      
      
      public static boolean checkValidUserName(String userName) throws ClassNotFoundException {
        boolean valid = true;
        try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("SELECT * FROM user ")
                        .append(" WHERE ")
                        .append(" USERNAME = ").append("'").append(userName).append("';");

                System.out.println(insQuery.toString());

                stmt.execute(insQuery.toString());

                if (stmt.getResultSet().next() == true) {
                    System.out.println("#DB: The member already exists");
                    valid = false;
                }

                // Close connection
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(Account.class.getName()).log(Level.SEVERE, null, ex);
        }

        return valid;
    }  
      
       public static boolean checkValidEmail(String email) throws ClassNotFoundException {
        boolean valid = true;
        try {
            try (Connection con = CS359DB.getConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("SELECT * FROM user ")
                        .append(" WHERE ")
                        .append(" EMAIL = ").append("'").append(email).append("';");

                stmt.execute(insQuery.toString());
                if (stmt.getResultSet().next() == true) {
                    System.out.println("#DB: The member alreadyExists");
                    valid = false;
                }

                // Close connection
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(Account.class.getName()).log(Level.SEVERE, null, ex);
        }

        return valid;
    }
      
}
