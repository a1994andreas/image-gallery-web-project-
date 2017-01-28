/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cs359db.servlets;

import cs359db.db.PhotosDB;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Andreas
 */
public class GetImageCollection extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        
        String userName = request.getParameter("userName");
        String num_of_photos = request.getParameter("num_of_photos");
        int type_of_user = Integer.parseInt(request.getParameter("type_of_user"));
        
        int number = Integer.parseInt(num_of_photos);
        System.out.println(num_of_photos);
        String json_format="["; 
        try {
            // uploadPhoto returns the id of the photo
             List<Integer> ids_list;
            if (type_of_user ==1){
             ids_list = PhotosDB.getPhotoIDs(number, userName);
            }else {
            ids_list =PhotosDB.getPhotoIDs(number);
            
            }

// String json_format="["; 
            int flag_first =0 ;
               for (int i=0 ; i<ids_list.size() ;i++){
                   if(flag_first==0)
                        json_format+=ids_list.get(i).toString();
                   else
                        json_format+=","+ids_list.get(i).toString();
                flag_first++;
               }
               json_format+="]";
               System.out.println("JSON FORMAT" +json_format);
            response.setContentType("application/json");
            
        } catch (Exception ex) {
            Logger.getLogger(UploadImage.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        try (PrintWriter out = response.getWriter()) {
                
                out.println(json_format);
            }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
