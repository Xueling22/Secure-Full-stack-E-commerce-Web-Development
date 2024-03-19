package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;
    @Autowired //Spring 在创建 MyDataRestConfig 类的实例时，自动注入一个 EntityManager 实例
    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager=theEntityManager;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        HttpMethod[] theUnsupportedActions={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        //这行代码获取了应用中所有 JPA 实体的元模型（metamodel）。元模型包含了实体的元数据，比如实体名称、属性、关系等
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        //创建集合
        List<Class> entityClasses=new ArrayList<>();
        //全放集合里
        for (EntityType tempEntityType:entities){
            entityClasses.add(tempEntityType.getJavaType());
        }
        //将 entityClasses 列表转换成数组，这是调用 config.exposeIdsFor 方法所需的形式。
        //new Class[0] 是 toArray 方法的参数，它指定了数组的类型和初始大小
        Class[] domainTypes=entityClasses.toArray(new Class[0]);

        //告诉 Spring Data REST 配置，为列表中的所有域类型（实体类）暴露它们的 ID 属性。这样，当这些实体通过 Spring Data REST API 返回给客户端时，响应的 JSON 中将包含每个实体的 ID 字段
        config.exposeIdsFor(domainTypes);

    }

}
