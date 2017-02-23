/*
 * SonarQube
 * Copyright (C) 2009-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
package org.sonar.db.loadedtemplate;

import org.sonar.db.Dao;
import org.sonar.db.DbSession;
import org.sonar.db.MyBatis;

public class LoadedTemplateDao implements Dao {

  private MyBatis mybatis;

  public LoadedTemplateDao(MyBatis mybatis) {
    this.mybatis = mybatis;
  }

  public int countByTypeAndKey(String type, String key) {
    try (DbSession session = mybatis.openSession(false)) {
      return countByTypeAndKey(type, key, session);
    }
  }

  public int countByTypeAndKey(String type, String key, DbSession session) {
    return session.getMapper(LoadedTemplateMapper.class).countByTypeAndKey(type, key);
  }

  public void insert(LoadedTemplateDto loadedTemplateDto) {
    try (DbSession session = mybatis.openSession(false)) {
      insert(loadedTemplateDto, session);
      session.commit();
    }
  }

  public void insert(LoadedTemplateDto loadedTemplateDto, DbSession session) {
    session.getMapper(LoadedTemplateMapper.class).insert(loadedTemplateDto);
  }

  public void delete(DbSession session, String type, String key) {
    session.getMapper(LoadedTemplateMapper.class).delete(type, key);
  }
}