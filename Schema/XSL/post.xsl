<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <h2>Posts</h2>
        <table border="1">
          <tr bgcolor="#9acd32">
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>ImagePath</th>
            <th>Content</th>
            <th>Comments</th>
          </tr>
          <xsl:for-each select="posts/post">
            <tr>
              <td><xsl:value-of select="title"/></td>
              <td><xsl:value-of select="author"/></td>
              <td><xsl:value-of select="date"/></td>
              <td><xsl:value-of select="imagePath"/></td>
              <td><xsl:value-of select="content"/></td>
              <td>
                <table>
                  <xsl:for-each select="comments/comment">
                    <tr>
                      <td><xsl:value-of select="author"/></td>
                      <td><xsl:value-of select="content"/></td>
                      <td><xsl:value-of select="date"/></td>
                    </tr>
                  </xsl:for-each>
                </table>
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
