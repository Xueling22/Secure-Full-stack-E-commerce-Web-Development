package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;



@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product,Long> { //这里命名完，url就是localhost:8080/products了
    //这个方法放这里，因为product有一个外键是categoryID
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable); //等于select * from这个方法，还可以根据页数调整想看的范围即第二个参数，url也会自动跟随这个方法名
    //findBy是告诉Spring Data JPA你想进行查找的操作的固定开始部分。
    //CategoryId是你实体中的属性，Spring Data JPA期望在Product实体或其父类中存在一个category属性，并且category对象有一个id属性。框架将使用这个属性来确定查询的过滤条件。
    Page<Product> findByNameContaining(@Param("name") String name,Pageable page); //http://localhost:8080/api/products/search/findByNameContaining?name=Beginner 这里的name对应这里的name，？是固定语法，分隔基础 URL 和查询字符串部分
    //查询结果被封装成 Page<Product> 对象，并通过 Spring Data REST 自动转换为 JSON 格式响应给客户端
}
