import java.sql.*;
import net.sf.json.JSONObject;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

//@WebServlet("/Form")
public class GetForm extends HttpServlet{
//	private static final long serialVersionUID = 1L;
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetForm() {
       
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 设置响应内容类型
		response.setContentType("text/html;charset=UTF-8");

		PrintWriter out = response.getWriter();
		String title = "使用 GET 方法读取表单数据";
		// 处理中文
		String name =new String(request.getParameter("name").getBytes("ISO8859-1"),"UTF-8");
		String docType = "<!DOCTYPE html> \n";
		out.println(docType +
		    "<html>\n" +
		    "<head><title>" + title + "</title></head>\n" +
		    "<body bgcolor=\"#f0f0f0\">\n" +
		    "<h1 align=\"center\">" + title + "</h1>\n" +
		    "<ul>\n" +
		    "  <li><b>站点名</b>："
		    + name + "\n" +
		    "  <li><b>网址</b>："
		    + request.getParameter("url") + "\n" +
		    "</ul>\n" +
		    "</body></html>");
	}
	
	// 处理 POST 方法请求的方法
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
