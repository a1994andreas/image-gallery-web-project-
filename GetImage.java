/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cs359db.servlets;

import cs359db.db.PhotosDB;
import cs359db.model.Photo;
import java.awt.Color;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.omg.CORBA.portable.ApplicationException;

/**
 *
 * @author Andreas
 */
public class GetImage extends HttpServlet {

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
            throws ServletException, IOException, Exception {
                response.setContentType("text/html;charset=UTF-8");

        String photo_id = request.getParameter("photo_id");
        String metadata = request.getParameter("metadata");
        int number = Integer.parseInt(photo_id);
       System.out.println("eeee"+number);
       if(metadata.equals("false")){
                try ( OutputStream os = response.getOutputStream()) {
                    /* TODO output your page here. You may use following sample code. */

               byte[] imgData = PhotosDB.getPhotoBlobWithID(number);
               
               //byte[] imgData2 = scale(imgData, 200, 300);
                            response.setContentType("image/jpg");   // Use the appropriate type from 
                            // output with the help of outputStream
                      os.write(imgData);
                      os.flush();
                      os.close();       

                } catch (ClassNotFoundException ex) {
                    Logger.getLogger(GetImage.class.getName()).log(Level.SEVERE, null, ex);
                }
       }else if (metadata.equals("true")){
            String json_format="";
                try  {
                         /* TODO output your page here. You may use following sample code. */

                   Photo photo_info = PhotosDB.getPhotoMetadataWithID(number);
               //    System.out.println(photo_info.getUserName() +" "+photo_info.getContentType()+" "+photo_info.getTitle()+" "+photo_info.getNumberOfRatings()+photo_info.getDate());
                      response.setContentType("application/json");
                      
                     
                      if(photo_info==null){
                         json_format+="[]";
                      }else {
                         json_format+="["+photo_info.getUserName() +","+photo_info.getContentType()+","+photo_info.getTitle()+","+photo_info.getDate()+"]";
                      }               

                     } catch (ClassNotFoundException ex) {
                         Logger.getLogger(GetImage.class.getName()).log(Level.SEVERE, null, ex);
                     }
              //      {userName:”name”, title:”title”,
              //date:”timestamp”, contentType:”image/jpg”, numberOfRatings:”0”}
                     
                    try (PrintWriter out = response.getWriter()) {
                
                out.println(json_format);
                     }
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
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(GetImage.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(GetImage.class.getName()).log(Level.SEVERE, null, ex);
        }
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

    public byte[] scale(byte[] fileData, int width, int height) throws Exception {
        ByteArrayInputStream in = new ByteArrayInputStream(fileData);
        try {
            BufferedImage img = ImageIO.read(in);
            if(height == 0) {
                height = (width * img.getHeight())/ img.getWidth(); 
            }
            if(width == 0) {
                width = (height * img.getWidth())/ img.getHeight();
            }
            Image scaledImage = img.getScaledInstance(width, height, Image.SCALE_SMOOTH);
            BufferedImage imageBuff = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            imageBuff.getGraphics().drawImage(scaledImage, 0, 0, new Color(0,0,0), null);

            ByteArrayOutputStream buffer = new ByteArrayOutputStream();

            ImageIO.write(imageBuff, "jpg", buffer);

            return buffer.toByteArray();
        } catch (IOException e) {
            throw new Exception("IOException in scale");
        }
    }
 
    
   
}
